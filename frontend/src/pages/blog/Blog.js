import styles from "./Blog.module.scss"
import Projet from "../../components/Projet/Projet"

import React, { useState, useEffect } from "react"

import { NavLink } from "react-router-dom";



export default function Blog() {
    const [filter, setFilter] = useState("")
    const [allTheProjet, setAllTheProjet] = useState([])
     // Bonus
  // const sorteData = allTheProjet.sort((a, b) => {
  //   const dateA = a.dateOfRelease.split("-")[0];
  //   const dateB = b.dateOfRelease.split("-")[0];
  //   return dateB.localeCompare(dateA)
  // })

  // page en cours
  const [currentPage, setCurrentPage] = useState(1); 
  // nombre de projet par page
  const viewPerPage = 5
  // dernier index affiché
  const lastIndex = currentPage * viewPerPage;
  // premier index affiché
  const firstIndex = lastIndex - viewPerPage;
  // recuper depuis firstindex a lastindex non inclus
  const views = allTheProjet.slice(firstIndex, lastIndex);
  
  // const views = sorteData.slice(firstIndex, lastIndex);  // Bonus

  // nombre total de pages
  const numberOfPage = Math.ceil(allTheProjet.length / viewPerPage);
  // 
  const numbers = [...Array(numberOfPage + 1).keys()].slice(1)

  // function formaDate(date) {
  //   const [year, month, day] = date.split("-");
  //   return`${day}-${month}-${year}`;
  // }

  function previousPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function nextPage() {
    if (currentPage !== numberOfPage) {
      setCurrentPage(currentPage + 1);
    }
  }
  function changeCurrentPage(id) {
    setCurrentPage(id);
  }
    

    const handleInput = (e) =>{
        const search = e.target.value;
        setFilter(search.trim().toLowerCase())
    }

    useEffect(() => {
        async function getProjet() {
          try {
            const response = await fetch(`http://localhost:8003/api/profileImage/getProjetValidate`);
            if (response.ok) {
              const projet = await response.json();
              const modifiedDataBack = projet.map((s) =>
                s.validation === 1 ? { ...s, validation: true } : { ...s, validation: false }
              );
              const newModifiedDatas = await Promise.all(
                modifiedDataBack.map(async (s) => {
                  if (s.validation === true) {
                    const response = await fetch(URL.createObjectURL(new Blob([new Uint8Array(s.image.data)])));
                    const text = await response.text();
                    
                    s.image = text;
                  }
                  return { ...s };
                  
                })
              );
              setAllTheProjet(newModifiedDatas);
            }
          } catch (error) {
            console.error(error);
          }
        }
        getProjet();
      }, []);
      
      console.log(allTheProjet);
    return(
        <>
        
        <div className="flex-fill container">
            <h1 className="my mb20 30">Bienvenue sur notre blog!</h1>
                <div className={`${styles.card} p20 d-flex flex-column mt20 `}>
                    <div className={`d-flex justify-content-center align-items-center my30 ${styles.search}`}>
                        <i className="fas fa-magnifying-glass mr10"></i>
                        <input onInput={handleInput} className="flex-fill p20" type="text" placeholder="Rechercher" />
                    </div>
                    <div className={`  ${styles.grid}`}>
                        {views
                            .filter((s) => s.name.toLowerCase().startsWith(filter))
                            .map((projet) => (
                            <Projet key={projet.idProjet} projet={projet} />
                        ))}
                    </div>
                </div>
        </div>
        <nav className={`d-flex justify-content-center ${styles.pagination}`}>
        <ul className='pagination d-flex justify-content-center'>
          <li className='page-item'>
            <a href="#" onClick={previousPage} className='page-link'>Prev</a>
          </li>
          {
            numbers.map((n, i ) => (
              <li key={i}
              className={`page-item ${currentPage === n ? "active" : ""}`}
              >
                <a 
                href="#"
                className='page-link' 
                onClick={() => changeCurrentPage(n)}
                >
                    {n}
                </a>
              </li>
            ))
          }
          <li className='page-item'>
            <a href="#" onClick={nextPage} className='page-link'>Next</a>
          </li>

        </ul>
      </nav>
        <div className="d-flex flex-column justify-content-center align-items-center m20">
            <h2>Vous voulez contribuer au Blog ?</h2>
            <br />
            <li><NavLink to="/inscription" className={`${styles.li}`}>Inscrivez-vous !</NavLink></li>
        </div>
        </>
    )
}
