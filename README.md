# Cryptr with Vue2

## 05 Protect your routes

Cryptr user data can be decoded easely, try inside your profile page :

```javascript
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
```

That's all 🙂