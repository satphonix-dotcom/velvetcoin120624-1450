import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DesignersList from './DesignersList';
import DesignerForm from './DesignerForm';

const Designers = () => {
  return (
    <Routes>
      <Route index element={<DesignersList />} />
      <Route path="new" element={<DesignerForm />} />
      <Route path=":id/edit" element={<DesignerForm />} />
    </Routes>
  );
};

export default Designers;