import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client/react';
import { AuthProvider } from './context/AuthContext';
import { client } from './utils/apolloClient';
import Layout from './components/Layout/Layout';
import Login from './components/Auth/Login';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import EmployeeGrid from './components/Employee/EmployeeGrid';
import './App.css';

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <EmployeeGrid />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employees"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <EmployeeGrid />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employees/grid"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <EmployeeGrid />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employees/list"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <EmployeeGrid />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              {/* Placeholder routes */}
              <Route
                path="/reports"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <div className="text-center py-20">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">📊 Reports</h2>
                        <p className="text-gray-600">Reports functionality coming soon...</p>
                      </div>
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports/attendance"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <div className="text-center py-20">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">📊 Attendance Reports</h2>
                        <p className="text-gray-600">Attendance reports coming soon...</p>
                      </div>
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports/performance"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <div className="text-center py-20">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">📊 Performance Reports</h2>
                        <p className="text-gray-600">Performance reports coming soon...</p>
                      </div>
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/departments"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <div className="text-center py-20">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">🏢 Departments</h2>
                        <p className="text-gray-600">Departments functionality coming soon...</p>
                      </div>
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/analytics"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <div className="text-center py-20">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">📈 Analytics</h2>
                        <p className="text-gray-600">Analytics functionality coming soon...</p>
                      </div>
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <div className="text-center py-20">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">⚙️ Settings</h2>
                        <p className="text-gray-600">Settings functionality coming soon...</p>
                      </div>
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
