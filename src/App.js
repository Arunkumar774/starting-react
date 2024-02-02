import "./App.css";
import { useEffect, useState,useReducer } from "react";
import styled from "@emotion/styled";
import PokemonFilter from "./components/PokemonFilter";
import PokemonTable from "./components/PokemonTable";
import PokemonContext from "./PokemonContext";
import PokemonInfo from "./components/PokemonInfo";

const Title = styled.h1`
  text-align: center;
`;
const Container = styled.div`
  margin: auto;
  width: 800px;
  padding-top: 1rem;
`;
const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  column-gap: 15px;
`;
const pokemonReducer = (state, action) => {
  switch (action.type) {
    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      };
    case "SET_POKEMON":
      return {
        ...state,
        pokemon: action.payload,
      };
    case "SET_SELECTED_ITEM":
      return {
        ...state,
        selectedItem: action.payload,
      };
  }
};

function App() {
  // const [filter, setFilter] = useState("");
  // const [pokemon, setPokemon] = useState([]);
  // const [selectedItem, setSelectedItem] = useState(null);
  const [state,dispatch] = useReducer(pokemonReducer,{
    filter: "",
    pokemon: [],
    selectedItem: null,
  })

  useEffect(() => {
    fetch("http://localhost:3000/starting-react/pokemon.json")
      .then((res) => res.json())
      .then((data) => 
        dispatch({
          type: "SET_POKEMON",
          payload: data,
        })
      );
  });
  if(!state.pokemon) {
    return <div>Loading data</div>
  }
  return (
    <PokemonContext.Provider
      value={{
        // filter,
        // setFilter,
        // pokemon,
        // setPokemon,
        // selectedItem,
        // setSelectedItem,
        state,
        dispatch
      }}
    >
      <Container>
        <Title>Pokemon Search</Title>
        <TwoColumnLayout>
          <div>
            <PokemonFilter />
            <PokemonTable />
          </div>
          <PokemonInfo />
        </TwoColumnLayout>
      </Container>
    </PokemonContext.Provider>
  );
}

export default App;
