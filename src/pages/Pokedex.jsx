import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import './styles/pokedex.css'
import useFetch from '../hooks/useFetch';
import PokeCard from '../components/pokedex/PokeCard';
import PokeSelect from '../components/pokedex/PokeSelect';

const Pokedex = () => {

  const [selectValue, setSelectValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [pokemons, getPokemons, getType] = useFetch();
  const [page, setPage] = useState(1);

  const trainer = useSelector(store => store.trainer);

  // Initial Page Load
  useEffect(() => {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=1500';
    getPokemons(url);
  }, [])

  useEffect(() => {
    getType(selectValue)

  }, [selectValue])

  const textInput = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    setInputValue(textInput.current.value.toLowerCase().trim());
    textInput.current.value = '';
  }

  const pokeSearch = (poke) => {
    const perName = poke.name.includes(inputValue);
    return perName;
  }

  const q = 5;

  const pagination = (currPage) => {
    return pokemons?.results.slice((currPage - 1) * q, currPage * q);
  }

  const handleDataInView = (page, inputValue) => {
    if (inputValue !== '') {
      return (
        pokemons?.results.filter(pokeSearch)?.length > 0 ? pokemons?.results.filter(pokeSearch).map((poke) => (
          <PokeCard
            key={poke.url}
            url={poke.url}
          />
        )) : <p className=''>No pokemon found</p>
      )
    } else {
      return pagination(page) && pagination(page)?.filter(pokeSearch).map((poke) => (
        <PokeCard
          key={poke.url}
          url={poke.url}
        />
      ))
    }
  }

  return (
    <div>
      <header className='pokedex__header'></header>
      <section className='pokedex__section'>
        <h2 className='pokedex__title'><span>Welcome {trainer},</span> here you can find your favorite pokemon</h2>
        <div>
          <form className='pokedex__form' onSubmit={handleSubmit}>
            <input className='pokedex__input' placeholder='Insert pokemon...' ref={textInput} type="text" />
            <button className='pokedex__btn'>Search</button>
          </form>
          <PokeSelect
            setSelectValue={setSelectValue}
          />
        </div>
        <div className='pokedex__container'>
          {
            handleDataInView(page, inputValue)
          }
          <div className='pokedex__buttons'>
            <button className='pokedex__btn' onClick={() => {
              if (page > 1) setPage(page - 1)
            }}>Pagina Anterior</button>
            <button className='pokedex__btn' onClick={() => {
              if (page * q < pokemons?.results?.length) setPage(page + 1)
            }}>Pagina Siguiente</button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Pokedex;