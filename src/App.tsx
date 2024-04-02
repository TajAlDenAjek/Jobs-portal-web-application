import LayoutContainer from "./Layout/Layout"
import { useState } from "react";
import { ConfigProvider,theme} from "antd";
const App = () => {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        }}>
        <LayoutContainer />
      </ConfigProvider>
    </>
  )
}

export default App