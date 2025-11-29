import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        username
        role
      }
    }
  }
`;

export const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee($input: EmployeeInput!) {
    createEmployee(input: $input) {
      id
      name
      age
      class
      subjects
      attendance
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: ID!, $input: EmployeeInput!) {
    updateEmployee(id: $id, input: $input) {
      id
      name
      age
      class
      subjects
      attendance
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id)
  }
`;