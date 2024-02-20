import { Lesson } from "./lessonDefine";


const URL = 'http://localhost:3000/api';

async function getAllLessons(date) {
    const response = await fetch(URL + '/getLessons');
    if (response.status !== 200 && response.status !== 304) return [];
    const lessonsJson = await response.json();
    return lessonsJson.map((l) => new Lesson(l.date, l.scenario1, l.scenario2, l.scenario3, l.grade, 
      l.evaluated, l.distance, l.to_evaluate,
      l.route_1,l.route_2,l.route_3,l.mistake_1,l.mistake_2,l.mistake_3));
  }


  async function updateLesson(date){
    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ date: date })
    };
    return fetch(URL + '/updateLesson', requestOptions);
}


async function saveLesson(lesson) {

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(lesson)
    };
    return fetch(URL + '/saveLesson', requestOptions);
  }



  const API = { getAllLessons , updateLesson};

  export default API;