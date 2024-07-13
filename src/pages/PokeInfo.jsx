import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import "./styles/pokeInfo.css";

export default () => {
  const params = useParams();

  const [pokemon, getPokemon] = useFetch();
  const [bgColor, setBgColor] = useState("white");

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${params.id}`;
    getPokemon(url);
  }, []);

  const capitalizeString = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <main className="main-container">
      <div className="header-container"></div>
      <div className="container">
        <figure
          className={`image-container ${
            pokemon?.types?.[0]?.type?.name
              ? pokemon?.types?.[0]?.type?.name
              : "default"
          }-bg-gradient`}
        >
          <img
            className="pokemon-img-container"
            src={pokemon?.sprites.other["official-artwork"].front_default}
          ></img>
        </figure>

        <p className="pokemon-id">#{pokemon?.id}</p>
        <h2 className="pokemon-name">
          {pokemon?.name ? capitalizeString(pokemon?.name) : pokemon?.name}
        </h2>

        <div className="altura-peso-container">
          <div className="peso-container">
            <p className="peso-text">Peso</p>
            <p className="peso-num">{pokemon?.weight}</p>
          </div>
          <div className="altura-container">
            <p className="altura-text">Altura</p>
            <p className="altura-num">{pokemon?.height}</p>
          </div>
        </div>

        <div className="tipos-habilidades-container">
          <div className="tipos-container">
            <h3>Tipo</h3>
            <ul className="tipos-lista">
              {pokemon?.types.map((type) => (
                <li key={type.type.url}>{capitalizeString(type.type.name)}</li>
              ))}
            </ul>
          </div>

          <div className="habilidades-container">
            <h3>Habilidades</h3>
            <ul className="habilidades-lista">
              {pokemon?.abilities.map((skill) => (
                <li key={skill.ability.url}>{capitalizeString(skill.ability.name)}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="estadisticas-container">
          <h2>Stats</h2>
          <ul className="estadisticas-lista">
            {pokemon?.stats.map((stat) => (
              <li key={stat.stat.url}>
                <span> {capitalizeString(stat.stat.name)}</span>
                <span> {stat.base_stat}/150</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="movimientos-container">
        <h2>Movements</h2>
        <ul className="movimientos-lista">
          {pokemon?.moves.map((move) => (
            <li className="movimientos-item" key={move.move.url}>
              {capitalizeString(move.move.name)}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};
