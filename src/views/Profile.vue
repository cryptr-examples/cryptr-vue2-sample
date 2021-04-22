<template>
  <div>
    <h1>This is an profile page</h1>
    <ul>
      <li>
        <small>{{ $cryptr.user.sub }}</small>
      </li>
      <li>{{ $cryptr.user.email }}</li>
    </ul>
    <hr />
    <h4>My Courses</h4>
    <div style="text-align: left;padding:.5rem 4rem;">
      <div
        v-if="courses && courses.length"
        style="padding:2rem;border-radius:.5rem;max-width:100%;width:100%;box-shadow:0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05);overflow:hidden;margin:2rem auto;flew-wrap:wrapdisplay:flex;border-width:1px;"
      >
        <div v-bind:key="course.id" v-for="course of courses">
          <div>
            <img
              style="max-height: 200px; max-width: 200px"
              :src="course.img"
              :alt="course.title"
            />
          </div>
          <div>
            <div>
              <p>
                Members only
              </p>
              <h2
                style="
                  color: rgb(17, 24, 39);
                  font-weight: bold;
                  margin-top: 1rem;
                "
              >
                {{ course.title }}
              </h2>
              <p>
                {{ course.desc }}
              </p>
              <div>
                <span
                  v-for="tag of course.tags"
                  v-bind:key="tag"
                  style="
                    color: white;
                    margin-right: 0.5rem;
                    display: inline-block;
                    padding: 0.5rem;
                    background-color: rgb(245, 158, 11);
                    border-radius: 9999px;
                  "
                >
                  #{{ tag }}
                </span>
              </div>
            </div>
            <div style="display: flex; align-items: center">
              <img
                style="
                  max-height: 30px;
                  max-width: 30px;
                  border-radius: 5px;
                  margin-right: 2rem;
                "
                :src="course.teacher.picture"
                :alt="course.teacher.name"
              />
              <div>
                <p>{{ course.teacher.name }}</p>
                <p>{{ course.date }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ul v-if="errors && errors.length">
        <li v-bind:key="error.message" v-for="error of errors">
          {{ error.message }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getCryptrClient } from "../CryptrPlugin";
export default {
  data() {
    return {
      courses: [],
      errors: [],
    };
  },
  created() {
    const client = getCryptrClient();
    client
      .decoratedRequest({
        method: "GET",
        url: "http://localhost:8000/api/v1/courses",
      })
      .then((data) => {
        console.log(data);
        this.courses = data.data;
      })
      .catch((error) => console.error(error));
  },
};
</script>
