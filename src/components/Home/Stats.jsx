import React, { useState, useEffect } from 'react';
export default function Stats() {
  const [usersCount, setUsersCount] = useState(0);
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = () => {
    fetch('/users_count')
      .then(response => response.json())
      .then(data => {
        setUsersCount(data);
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
  };
  return (
    <section className="stats_box py-10 grid place-items-center lg:grid-cols-4 grid-cols-2 gap-4 sm:w-9/12 w-11/12 mx-auto -mt-8 px-4">
      <div>
        <h1 className="md:text-[40px] text-[25px] font-bold">120+</h1>
        <p>Recent guides</p>
      </div>
      <div>
        <h1 className="md:text-[40px] text-[25px] font-bold">{usersCount}</h1>
        <p>Users</p>
      </div>
      <div>
        <h1 className="md:text-[40px] text-[25px] font-bold">200+</h1>
        <p>Destinations</p>
      </div>
      <div>
        <h1 className="md:text-[40px] text-[25px] font-bold">50+</h1>
        <p>Blog</p>
      </div>
    </section>
  );
}