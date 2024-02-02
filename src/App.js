import "./App.css";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import PokemonFilter from "./components/PokemonFilter";
import PokemonTable from "./components/PokemonTable";
import PokemonContext from './PokemonContext';
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
function App() {
  const [filter, setFilter] = useState("");
  const [pokemon, setPokemon] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3000/starting-react/pokemon.json")
      .then((res) => res.json())
      .then((data) => setPokemon(data));
  });
  return (
    <PokemonContext.Provider
      value={{
        filter,
        setFilter,
        pokemon,
        setPokemon,
        selectedItem,
        setSelectedItem
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
