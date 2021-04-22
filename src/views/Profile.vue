<template>
  <div class="profile">
    <h1>This is an profile page</h1>
    <ul>
      <li>
        <small>{{ $cryptr.user.sub }}</small>
      </li>
      <li>{{ $cryptr.user.email }}</li>
    </ul>
    <hr />
    <h4>My Courses</h4>
    <div style="text-align: left">
      <div 
        v-if="courses && courses.length" 
        class="flex flex-wrap mb-6 max-w-sm w-full md:max-w-full shadow-lg border rounded-lg overflow-hidden">
        <div 
          v-bind:key="course.id" 
          v-for="course of courses"
          class="flex flex-col md:flex-row w-full h-full cursor-pointer">
          <div class="flex items-center w-full h-48 md:h-auto md:w-64">
            <img class="w-auto h-auto object-top md:object-center object-cover" :src="course.img" :alt="course.title" />
          </div>
          <div
          class="flex w-full h-full border-gray-400 bg-gray-100 lg:rounded-r-lg p-6 flex flex-col justify-between leading-normal">
            <div class="mb-8">
              <p class="text-sm text-blue-500 flex items-center">
                <svg class="fill-current text-blue-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path
                    d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                </svg>
                Members only
              </p>
              <div class="text-gray-900 font-bold text-xl mt-2">
                {{course.title}}
              </div>
              <p class="text-gray-600 text-base md:h-20 lg:h-12 mt-3">
                {{course.desc}}
              </p>
              <div class="mt-6">
                <span
                  v-for="tag of course.tags"
                  v-bind:key="tag"
                  class="inline-block bg-yellow-500 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #{{tag}}
                </span>
              </div>
            </div>
            <div class="flex items-center">
              <img class="w-10 h-10 rounded-full mr-4 object-cover" :src="course.teacher.picture" :alt="course.teacher.name" />
              <div class="text-sm">
                <p class="text-gray-900 leading-none">{{course.teacher.name}}</p>
                <p class="text-gray-600">{{course.date}}</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      <ul v-if="errors && errors.length">
        <li v-bind:key="error.message" v-for="error of errors">
          {{error.message}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getCryptrClient } from "../CryptrPlugin";
export default ({
  data() {
    return {
      courses: [],
      errors: [],
    }
  },
  created() {
    const client = getCryptrClient();
    client.decoratedRequest({
      method: "GET",
      url: "http://localhost:8000/api/v1/courses",
    }).then(data => {
      console.log(data);
      this.courses = data.data;
    }).catch(error => console.error(error));
  }
})
</script>

