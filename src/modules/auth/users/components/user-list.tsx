'use client'

import { User } from '@prisma/client'
import { useEffect, useState } from 'react'

export default function UserList() {
  const [user, setUsers] = useState([])

  useEffect(() => {
    fetch('/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data.users))
  }, [])

  return (
    <ul className="my-10">
      {user.map((user: User) => (
        <li key={user.id}>
          {user.name}/{user.email}
        </li>
      ))}
    </ul>
  )
}
