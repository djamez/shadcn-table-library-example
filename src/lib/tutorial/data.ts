export type Employee = {
  id: number
  name: string
  email: string
  department: 'Engineering' | 'Design' | 'Marketing' | 'Sales'
  role: string
  status: 'Active' | 'On leave' | 'Inactive'
  salary: number
}

export const employees: Employee[] = [
  { id: 1, name: 'Ava Thompson', email: 'ava.t@acme.dev', department: 'Engineering', role: 'Staff Engineer', status: 'Active', salary: 182000 },
  { id: 2, name: 'Liam Chen', email: 'liam.chen@acme.dev', department: 'Design', role: 'Product Designer', status: 'Active', salary: 134000 },
  { id: 3, name: 'Sofia Patel', email: 'sofia.p@acme.dev', department: 'Engineering', role: 'Engineering Manager', status: 'On leave', salary: 176000 },
  { id: 4, name: 'Noah Garcia', email: 'noah.g@acme.dev', department: 'Engineering', role: 'Senior Engineer', status: 'Active', salary: 158000 },
  { id: 5, name: 'Mia Johnson', email: 'mia.j@acme.dev', department: 'Design', role: 'Design Lead', status: 'Active', salary: 148000 },
  { id: 6, name: 'Ethan Kim', email: 'ethan.kim@acme.dev', department: 'Sales', role: 'Account Executive', status: 'Inactive', salary: 112000 },
  { id: 7, name: 'Isabella Rossi', email: 'isabella.r@acme.dev', department: 'Design', role: 'Design Systems Lead', status: 'Active', salary: 151000 },
  { id: 8, name: 'Lucas Martin', email: 'lucas.m@acme.dev', department: 'Sales', role: 'Sales Manager', status: 'Active', salary: 139000 },
  { id: 9, name: 'Amelia Novak', email: 'amelia.n@acme.dev', department: 'Engineering', role: 'Senior Engineer', status: 'Active', salary: 165000 },
  { id: 10, name: 'Mason Lee', email: 'mason.lee@acme.dev', department: 'Marketing', role: 'Content Strategist', status: 'Active', salary: 104000 },
  { id: 11, name: 'Charlotte Diaz', email: 'charlotte.d@acme.dev', department: 'Marketing', role: 'Marketing Director', status: 'On leave', salary: 162000 },
  { id: 12, name: 'James Wilson', email: 'james.w@acme.dev', department: 'Sales', role: 'Sales Development Rep', status: 'Active', salary: 86000 },
]

export type OrgNode = {
  id: string
  name: string
  role: string
  status: string
  children?: OrgNode[]
}

export const org: OrgNode[] = [
  {
    id: 'engineering',
    name: 'Engineering',
    role: 'Department',
    status: '—',
    children: [
      {
        id: 'frontend',
        name: 'Frontend',
        role: 'Team',
        status: '—',
        children: [
          { id: 'ava', name: 'Ava Thompson', role: 'Frontend Lead', status: 'Active' },
          { id: 'liam', name: 'Liam Chen', role: 'Frontend Engineer', status: 'Active' },
        ],
      },
      {
        id: 'backend',
        name: 'Backend',
        role: 'Team',
        status: '—',
        children: [
          { id: 'sofia', name: 'Sofia Patel', role: 'Backend Lead', status: 'Active' },
          { id: 'noah', name: 'Noah Garcia', role: 'Backend Engineer', status: 'Inactive' },
        ],
      },
    ],
  },
  {
    id: 'design',
    name: 'Design',
    role: 'Department',
    status: '—',
    children: [
      {
        id: 'product-design',
        name: 'Product Design',
        role: 'Team',
        status: '—',
        children: [
          { id: 'mia', name: 'Mia Johnson', role: 'Design Lead', status: 'Active' },
          { id: 'ethan', name: 'Ethan Kim', role: 'Product Designer', status: 'Pending' },
        ],
      },
    ],
  },
]
