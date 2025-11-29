import { gql } from '@apollo/client';

export const GET_EMPLOYEES = gql`
  query GetEmployees($limit: Int, $offset: Int, $sortBy: String, $sortOrder: String) {
    employees(limit: $limit, offset: $offset, sortBy: $sortBy, sortOrder: $sortOrder) {
      id
      name
      age
      class
      subjects
      attendance
    }
  }
`;

export const SEARCH_EMPLOYEES = gql`
  query SearchEmployees($query: String!, $limit: Int, $offset: Int) {
    searchEmployees(query: $query, limit: $limit, offset: $offset) {
      employees {
        id
        name
        age
        class
        subjects
        attendance
      }
      total
      hasMore
    }
  }
`;

export const GET_ME = gql`
  query GetMe {
    me {
      id
      username
      role
    }
  }
`;

export const GET_EMPLOYEE_BY_ID = gql`
  query GetEmployeeById($id: ID!) {
    employee(id: $id) {
      id
      name
      age
      class
      subjects
      attendance
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      id
      username
      role
    }
  }
`;