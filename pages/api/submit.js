// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GoogleSpreadsheet } from "google-spreadsheet";
const { checkAddress } = require("@polkadot/util-crypto");
import { google } from "googleapis";

// Config variables
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const SHEET_TITLE = process.env.SHEET_TITLE;
const CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, "\n");

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

const appendSpreadsheet = async (row) => {
  await doc.useServiceAccountAuth({
    client_email: CLIENT_EMAIL,
    private_key: PRIVATE_KEY,
  });

  // loads document properties and worksheets
  await doc.loadInfo();

  const sheet = doc.sheetsByTitle[SHEET_TITLE];
  await sheet.addRow(row);
};

const checkSpreadsheet = async (row) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
  })
  const client = await auth.getClient()
  const sheet = google.sheets({ version: 'v4', auth: client })
  const { data: { values } } = await sheet.spreadsheets.values.get({ 
    auth, 
    spreadsheetId: SPREADSHEET_ID,  
    range: `${SHEET_TITLE}!A1:B` 
  })

  for(let i=values.length-1; i>0; i--) {
    if(values[i][0] == row.email || values[i][1] == row.address) {
      return false
    }
  }
  return true;
}

const isvalidSubstrateAddress = (address) => {
  const check = checkAddress(address, 42);
  const check2 = checkAddress(address, 972);

  if (check[0] || check2[0]) {
    return true;
  } else {
    return false;
  }
}

export default async function handler(req, res) {
  if(req.method == "POST") {
    const { email, address } = req.body;
    const timestamp = new Date().toLocaleString();

    if(isvalidSubstrateAddress(address)) {
      const row = { email, address, timestamp }
      if(await checkSpreadsheet(row)) {
        try {
          await appendSpreadsheet(row)
          res.status(200).json({ 
            code: 200,
            data: {
              message: `submit successfully at ${timestamp}`
            }
          })
        } catch (e) {
          res.status(400).json({ 
            code: 400,
            data: {
              message: e
            }
          })
        }
      } else {
        res.status(400).json({ 
          code: 400,
          data: {
            message: "you have already been submitted"
          }
        })
      }
    } else {
      res.status(400).json({ 
        code: 400,
        data: {
          message: "selendra account is not valid!"
        }
      })
    }
  } else {
    res.status(400).json({ 
      code: 400,
      data: {
        message: "try POST"
      }
    })
  }
}
