import { useState } from 'react'
import './App.css'
import { gql } from '@apollo/client'
import { useQuery, useMutation } from '@apollo/client/react'

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      name
      age
      isMarried
    }
  }
`

const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      name
      age
      isMarried
    }
  }
`

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $age: Int!, $isMarried: Boolean!) {
    createUser(name: $name, age: $age, isMarried: $isMarried) {
      id
      name
      age
      isMarried
    }
  }
`

const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $name: String, $age: Int, $isMarried: Boolean) {
    updateUser(id: $id, name: $name, age: $age, isMarried: $isMarried) {
      id
      name
      age
      isMarried
    }
  }
`

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      name
    }
  }
`

const emptyForm = { name: '', age: '', isMarried: false }

function App() {
  const [selectedId, setSelectedId] = useState('')
  const [lookupId, setLookupId] = useState('')
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)

  const { data, loading, error, refetch } = useQuery(GET_USERS)

  const {
    data: userByIdData,
    loading: userByIdLoading,
    error: userByIdError,
    refetch: refetchUserById,
  } = useQuery(GET_USER_BY_ID, {
    variables: { id: lookupId },
    skip: !lookupId,
  })

  const refetchOptions = { refetchQueries: [{ query: GET_USERS }] }

  const [createUser, { loading: creating }] = useMutation(CREATE_USER, refetchOptions)
  const [updateUser, { loading: updating }] = useMutation(UPDATE_USER, refetchOptions)
  const [deleteUser, { loading: deleting }] = useMutation(DELETE_USER, refetchOptions)

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const resetForm = () => {
    setForm(emptyForm)
    setEditingId(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const variables = {
      name: form.name.trim(),
      age: parseInt(form.age, 10),
      isMarried: form.isMarried,
    }

    if (!variables.name || Number.isNaN(variables.age)) return

    if (editingId) {
      await updateUser({ variables: { id: editingId, ...variables } })
    } else {
      await createUser({ variables })
    }

    resetForm()
  }

  const startEdit = (user) => {
    setEditingId(user.id)
    setForm({
      name: user.name,
      age: String(user.age),
      isMarried: user.isMarried,
    })
  }

  const handleDelete = async (id) => {
    await deleteUser({ variables: { id } })
    if (lookupId === id) {
      setLookupId('')
      setSelectedId('')
    }
    if (editingId === id) resetForm()
  }

  const handleLookup = (e) => {
    e.preventDefault()
    if (selectedId.trim()) {
      setLookupId(selectedId.trim())
    }
  }

  if (loading) return <p className="status">Loading users...</p>
  if (error) return <p className="status error">Error: {error.message}</p>

  const users = data?.getUsers ?? []
  const lookedUpUser = userByIdData?.getUserById

  return (
    <div>
      <header>
        <h1>Users CRUD</h1>
        <p className="subtitle">GraphQL with Apollo Client</p>
      </header>

      <section className="panel">
        <h2>{editingId ? 'Update User' : 'Create User'}</h2>
        <form className="user-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              name="name"
              value={form.name}
              onChange={handleFormChange}
              placeholder="Enter name"
              required
            />
          </label>
          <label>
            Age
            <input
              name="age"
              type="number"
              min="1"
              value={form.age}
              onChange={handleFormChange}
              placeholder="Enter age"
              required
            />
          </label>
          <label className="checkbox-label">
            <input
              name="isMarried"
              type="checkbox"
              checked={form.isMarried}
              onChange={handleFormChange}
            />
            Married
          </label>
          <div className="form-actions">
            <button type="submit" disabled={creating || updating}>
              {editingId ? (updating ? 'Updating...' : 'Update User') : (creating ? 'Creating...' : 'Create User')}
            </button>
            {editingId && (
              <button type="button" className="secondary" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="panel">
        <h2>Get User by ID</h2>
        <form className="lookup-form" onSubmit={handleLookup}>
          <input
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            placeholder="Enter user ID (e.g. 1)"
          />
          <button type="submit">Fetch</button>
          {lookupId && (
            <button
              type="button"
              className="secondary"
              onClick={() => refetchUserById()}
            >
              Refresh
            </button>
          )}
        </form>

        {userByIdLoading && <p className="status">Loading user...</p>}
        {userByIdError && <p className="status error">Error: {userByIdError.message}</p>}
        {lookupId && !userByIdLoading && !lookedUpUser && (
          <p className="status">No user found with ID {lookupId}</p>
        )}
        {lookedUpUser && (
          <div className="user-card highlight">
            <p><strong>ID:</strong> {lookedUpUser.id}</p>
            <p><strong>Name:</strong> {lookedUpUser.name}</p>
            <p><strong>Age:</strong> {lookedUpUser.age}</p>
            <p><strong>Married:</strong> {lookedUpUser.isMarried ? 'Yes' : 'No'}</p>
          </div>
        )}
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2>All Users</h2>
          <button type="button" className="secondary" onClick={() => refetch()}>
            Refresh List
          </button>
        </div>

        {users.length === 0 ? (
          <p className="status">No users yet. Create one above.</p>
        ) : (
          <div className="user-list">
            {users.map((user) => (
              <div key={user.id} className="user-card">
                <p><strong>ID:</strong> {user.id}</p>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Age:</strong> {user.age}</p>
                <p><strong>Married:</strong> {user.isMarried ? 'Yes' : 'No'}</p>
                <div className="card-actions">
                  <button type="button" onClick={() => startEdit(user)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className="danger"
                    disabled={deleting}
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default App
