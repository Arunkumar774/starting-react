import "./App.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";

const PokemonRow = ({ pokemon, onSelect }) => {
  return (
    <tr key={pokemon.id}>
      <td>{pokemon.name.english}</td>
      <td>{pokemon.type.join(", ")}</td>
      <td>
        <Button variant="contained" onClick={() => onSelect(pokemon)}>
          Select
        </Button>
      </td>
    </tr>
  );
};
const PokemonInfo = ({ name, base }) => {
  return (
    <div>
      <h1>{name.english}</h1>
      <table>
        <tbody>
          {Object.keys(base).map((key) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{base[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
PokemonInfo.propTypes = {
  name: PropTypes.shape({
    english: PropTypes.string.isRequired,
  }),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number.isRequired,
    "Sp. Attack": PropTypes.number.isRequired,
    "Sp. Defense": PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired,
  }),
};
PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string.isRequired,
    }),
    type: PropTypes.arrayOf(PropTypes.string.isRequired),
    onSelect: PropTypes.func.isRequired,
  }),
};
function App() {
  const [filter, setFilter] = useState("");
  const [pokemon, setPokemon] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3000/starting-react/pokemon.json")
      .then((res) => res.json())
      .then((data) => setPokemon(data));
  });
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
  const Input = styled.input`
    width: 100%;
    font-size: x-large;
  `;
  return (
    <Container>
      <Title>Pokemon Search</Title>
      <TwoColumnLayout>
        <div>
          <Input value={filter} onChange={(e) => setFilter(e.target.value)} />
          <table width="100%">
            <thead>
              <tr>
                <td>Name</td>
                <td>Type</td>
              </tr>
            </thead>
            <tbody>
              {/* here with map we have many values so we can use slice */}
              {pokemon
                .filter((pokemon) =>
                  pokemon.name.english
                    .toLowerCase()
                    .includes(filter.toLowerCase())
                )
                .slice(0, 20)
                .map((pokemon) => {
                  return (
                    <PokemonRow
                      pokemon={pokemon}
                      key={pokemon.id}
                      onSelect={(pokemon) => setSelectedItem(pokemon)}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
        {selectedItem && <PokemonInfo {...selectedItem} />}
      </TwoColumnLayout>
    </Container>
  );
}

export default App;
