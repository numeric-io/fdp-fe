import React, { useMemo } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { APIClient } from "./api-client/api-client"
import App, { AppContext } from "./App"
import { BASE_PATH } from "./lib/routing/types"
import "./styles/globals.css"

const BASE_URL = "http://localhost:3005"

const DevApp = () => {
  const apiClient = useMemo(() => new APIClient(BASE_URL), [])
  return (
    <>
      <AppContext.Provider value={{ client: apiClient, basePath: BASE_PATH }}>
        <App />
      </AppContext.Provider>
    </>
  )
}

let rootEl: HTMLElement | null = document.getElementById("fdp-root")
if (!rootEl) {
  rootEl = document.createElement("div")
  rootEl.id = "fdp-root"
  document.body.appendChild(rootEl)
}
const root = ReactDOM.createRoot(rootEl)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="h-full p-4">
        <DevApp />
      </div>
    </BrowserRouter>
  </React.StrictMode>
)
