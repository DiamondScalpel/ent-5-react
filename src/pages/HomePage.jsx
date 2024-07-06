import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setTrainer } from '../store/slices/trainer.slice';
import { useNavigate } from 'react-router-dom';
import './styles/homePage.css';

const HomePage = () => {

   
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const textInput = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(setTrainer(textInput.current.value.trim()));
        textInput.current.value = '';
        navigate('/pokedex');
    }

  return (
    <div className='homepage'>
    <div className='homepage__container'>
        <img className='homepage__img' src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgaxZvvKRQPiiwXbg7WzFDdLKcb9YcNp8-rKz7sb0MLvhjjQw-n5SnkYeaHETL7eVDbxI2N88V8ACdvZfbf919f9erTZB2f06cJP3EfWxjj9L2MOLuyLJKLboI91HOZUn4pBFVmF7necqRv/s1600/pokedex-3d-logo.png" alt="pokedex img" />
        <h1 className='homepage__title'>Hi Trainer!</h1>
        <h2 className='homepage__subtitle'>To start, please insert your name!</h2>
        <form className='homepage__form' onSubmit={handleSubmit}>
            <input className='homepage__input' ref={textInput} type="text" placeholder="Your name..."  />
            <button className='homepage__btn'>Start</button>
        </form>
    </div>
    <footer className='homepage__footer'>
    </footer>
    </div>
  )
}

export default HomePage;