import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import './styles/pokeInfo.css';

const PokeInfo = () => {

    const params = useParams();

    const [pokemon, getPokemon] = useFetch();
    
    useEffect(() => {
      const url = `https://pokeapi.co/api/v2/pokemon/${params.id}`;
      getPokemon(url);
    }, []);
    


    console.log(pokemon);

  return (
    <section className='pokeinfo'>
      <div className='pokeinfo__container'>
      <figure className='pokeinfo__img'>
        <img className='pokeinfo__img2' src={pokemon?.sprites.other['official-artwork'].front_default} alt="pokemon image" />
      </figure>
      <span className='pokeinfo__span'># {pokemon?.id}</span>
      <h2 className='pokeinfo__title__h2'>{pokemon?.name}</h2>
      <ul className='pokeinfo__list'>
        <li className='pokeinfo__item'><span>weight</span><span>{pokemon?.weight}</span></li>
        <li className='pokeinfo__item'><span>height</span><span>{pokemon?.height}</span></li>
      </ul>
      <div className='pokeinfo__container'>
        <article className='pokeinfo__article'>
          <h3 className='pokeinfo__title__h3'>type</h3>
          <ul className='pokeinfo__list'>
            {
              pokemon?.types.map(type => (
                <li className='pokeinfo__item' key={type.type.url}>{type.type.name}</li>
              ))
            }
          </ul>
        </article>
        <article className='pokeinfo__article'>
          <h3 className='pokeinfo__title__h3'>skills</h3>
          <ul className='pokeinfo__list'>
            {
              pokemon?.abilities.map(skill => (
                <li className='pokeinfo__item' key={skill.ability.url}>{skill.ability.name}</li>
              ))
            }
          </ul>
        </article>
      </div>
      <h2 className='pokeinfo__title__h2'>Stats</h2>
      <ul className='pokeinfo__list'>
        {
          pokemon?.stats.map(stat => (
            <li className='pokeinfo__item' key={stat.stat.url}><span>{stat.stat.name}</span><span>{stat.base_stat}/150</span>
            <div><div></div></div></li>
          ))
        }
      </ul>
      </div>
      <div className='pokeinfo__container'>
      <h2 className='pokeinfo__title__h2'>Movements</h2>
      <ul className='pokeinfo__list'>
        {
          pokemon?.moves.map(move => (
            <li className='pokeinfo__item' key={move.move.url}>{move.move.name}</li>
          ))
        }
        </ul>
        </div>
    </section>
  )
}

export default PokeInfo;