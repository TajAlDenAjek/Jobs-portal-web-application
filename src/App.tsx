import LayoutContainer from "./Layout/Layout"
import { useState } from "react";
import { ConfigProvider, theme } from "antd";
import { store } from "./app/store";
import { Provider } from 'react-redux'

const App = () => {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <>
      <Provider store={store}>
        <ConfigProvider
          theme={{
            algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
          }}>
          <LayoutContainer />
        </ConfigProvider>
      </Provider>
    </>
  )
}

export default App