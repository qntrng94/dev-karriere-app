import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { OverviewPage } from "./pages/OverviewPage";
import { CreatePage } from "./pages/CreatePage";
import { EditPage } from "./pages/EditPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<OverviewPage />} />
        <Route path="create" element={<CreatePage />} />
        <Route path="edit/:id" element={<EditPage />} />
      </Route>
    </Routes>
  );
}

export default App;
