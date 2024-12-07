<script setup>
import { ref, onMounted } from 'vue';
import { getStu } from '@/axios'; // Assuming the axios functions are imported from this path

const students = ref([]);
const errorMessage = ref('');

// Fetch student data on component mount
onMounted(() => {
  getStu(
      (data) => {
        students.value = data; // Set the fetched student data
      },
      (msg, code) => {
        errorMessage.value = `Error ${code}: ${msg}`; // Set the error message
      }
  );
});
</script>

<template>
  <div>
    <h1>Student List</h1>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <table v-if="students.length > 0" border="1">
      <thead>
        <tr>
          <th>Student ID</th>
          <th>Student Name</th>
          <th>Phone</th>
          <th>Class</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student.uid">
          <td>{{ student.uid }}</td>
          <td>{{ student.uname }}</td>
          <td>{{ student.phone }}</td>
          <td>{{ student.clz.clzname }} ({{ student.clz.clzno }})</td>
        </tr>
      </tbody>
    </table>

    <div v-else>
      <p>No students available.</p>
    </div>
  </div>
</template>

<style scoped>
.error {
  color: red;
  font-size: 1.2em;
}

.student-item {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.student-pic {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
}

h2 {
  font-size: 1.5em;
  margin: 0;
}
</style>