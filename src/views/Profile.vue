<template>
  <div class="profile">
    <h1>This is an profile page</h1>
    <ul>
      <li>
        <small>{{ $cryptr.user.sub }}</small>
      </li>
      <li>{{ $cryptr.user.email }}</li>
    </ul>
  </div>
</template>
