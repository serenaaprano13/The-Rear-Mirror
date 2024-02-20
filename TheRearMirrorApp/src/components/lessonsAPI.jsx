import { Lesson } from "./lessonDefine";


const URL = 'http://localhost:3000/api';

async function getAllLessons(date) {
    const response = await fetch(URL + '/getLessons');
    if (response.status !== 200 && response.status !== 304) return [];
    const lessonsJson = await response.json();
    return lessonsJson.map((l) => new Lesson(l.date, l.scenario1, l.scenario2, l.scenario3, l.grade, l.evaluated, l.distance, l.to_evaluate));
  }


  const API = { getAllLessons };

  export default API;