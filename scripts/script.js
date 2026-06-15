import { intersectionObserver } from "./intersectionObserver.js"
import { createDisplayProject } from "./createDisplayProjects.js"
import { createProject } from "./createProjects.js"

const pointer = document.querySelector(".pointer")
const skills = document.querySelector("#skills")
const clickables = [...document.querySelectorAll("button"), ...document.querySelectorAll("a")]
const cardsContainer = document.querySelector(".cards")
const socialIcons = document.querySelectorAll(".social-icons")
const seeMore = document.querySelector(".see-more")
const para = document.querySelector(".hero-p")
const mainHeader = document.querySelector(".main-header")
const closeProjects = document.querySelector(".close-projects")
const projectsPage = document.querySelector(".projects-page")
const allProjectsContainer = document.querySelector(".all-projects")
let projects = [];
const hero = document.querySelector(".h-name")
const heading =  document.querySelector(".heading1")

addEventListener("DOMContentLoaded",()=>{
  fetchProjects()
})

function useParallax() {
  const y = window.scrollY * 1.5; 
  const z = window.scrollY * 0.5; 
  hero.style.transform = `translateY(${-y}px)`;
  para.style.transform = `translateY(${-z}px)`;
}

 async function fetchProjects(){
    const res = await fetch("../projects.json");
    projects = await res.json()
    projects = projects.projects
    createThreeProjects(projects)
  }


seeMore.onclick = () => {
  projectsPage.style.display = "flex"
  if( projects.lenght <= 0){
    console.log("no projects")
  }else{
     createAllProjects(projects)
  }
}

function createAllProjects(projects){
  let delay = 0

  projects.forEach(project => {
    delay += 300 
    const projectCard = createProject(project)
    allProjectsContainer.append(projectCard)

    setTimeout(() => {
       projectCard.style.display = `flex`
    },delay);
  })
}

function createThreeProjects(projects){
  const items = projects.slice(0,3)

  items.forEach(item =>{
    const projectCard = createDisplayProject(item)
    cardsContainer.append(projectCard)
  })
}


closeProjects.onclick = () => {
  console.log(allProjectsContainer)

  while(allProjectsContainer.firstChild){
    allProjectsContainer.firstChild.remove()
  }

  projectsPage.style.display = "none"
}

addEventListener("mousemove", (e)=>{
    pointer.style.top = `${e.y - 7.5}px`
    pointer.style.left = `${e.x - 7.5}px`
})

clickables.forEach(item => {
    item.onmouseover = () => {
        pointer.style.transform = `scale(1.3)`
        pointer.style.backgroundColor = `var(--purple-color)`
    }
    item.onmouseout = () => {
        pointer.style.transform = `scale(1)`
        pointer.style.backgroundColor = `white`
    }
})

function scaleProjectCardDown(element){
    element.style.transform = `scale(0.33)` 
}

function scaleProjectCardUp(element){
    element.style.transform = `scale(1)` 
}

function handleScroll(e) {
  const cards = [...document.querySelectorAll(".card")]

  cards.forEach(card => {
    const rect = card.getBoundingClientRect()

    if (rect.top < 90) {
      scaleProjectCardDown(card)
    } else {
      scaleProjectCardUp(card)
    }
  })

  adjustMainHeader()

  useParallax(e)
}

function adjustMainHeader(){
  if(scrollY > 50){
    mainHeader.classList.add("detachedHeader")
  }else{
    mainHeader.classList.remove("detachedHeader")
  }
}

window.addEventListener("scroll", handleScroll)

