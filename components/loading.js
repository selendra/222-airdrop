import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';


export default function loading() {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  
  return (
    <center style={{ marginTop: '4rem'}}>
      <Spin indicator={antIcon} />
    </center>
  );
}
