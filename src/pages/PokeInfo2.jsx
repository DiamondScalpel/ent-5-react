import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import './styles/pokeInfo2.css';


export default () => {
    const params = useParams();

    const [pokemon, getPokemon] = useFetch();

    useEffect(() => {
        const url = `https://pokeapi.co/api/v2/pokemon/${params.id}`;
        getPokemon(url);
    }, [])


    return (
        <main className='main-container'>
            <div className='container' >
                <figure>
                    <img src={pokemon?.sprites.other['official-artwork'].front_default}>
                    </img>
                </figure>
                <p>#{pokemon?.id}</p>
                <h2>{pokemon?.name}</h2>

                <div className='altura-peso-container'>
                    <div className='peso-container'><p>Peso</p> <span>{pokemon?.weight}</span></div>
                    <div className='altura-container'><p>Altura</p><p>{pokemon?.height}</p></div>
                </div>

                <div className='tipos-habilidades-container'>
                    <div className='tipos-container'>
                        <h3>Tipo</h3>
                        <ul className='tipos-lista'>{
                            pokemon?.types.map(type => (
                                <li key={type.type.url}>{type.type.name}</li>
                            ))
                        }</ul>
                    </div>

                    <div className='habilidades-container'>
                        <h3 >Habilidades</h3>
                        <ul className='habilidades-lista'>
                            {
                                pokemon?.abilities.map(skill => (
                                    <li key={skill.ability.url}>{skill.ability.name}</li>
                                ))
                            }
                        </ul>
                    </div>


                </div>

                <div>
                    <h2>Stats</h2>
                    <ul >
                        {
                            pokemon?.stats.map(stat => (
                                <li key={stat.stat.url}><span>{stat.stat.name}</span><span>{stat.base_stat}/150</span></li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <div></div>
        </main>
    )
}