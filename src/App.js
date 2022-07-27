import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '',
      cardAttr2: '',
      cardAttr3: '',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      cardCollection: [],
      filterCard: '',
    };
  }

  parseAttr = (string) => parseInt(string, 10)

  checkSaveButton = () => {
    this.setState((prevState) => {
      const attr1 = this.parseAttr(prevState.cardAttr1);
      const attr2 = this.parseAttr(prevState.cardAttr2);
      const attr3 = this.parseAttr(prevState.cardAttr3);

      const checkFieldInputs = prevState.cardName
        && prevState.cardDescription && prevState.cardImage;

      const pointsAttributes = attr1 + attr2 + attr3;
      const summedPointsLimits = 210;
      const checkLessThan = pointsAttributes <= summedPointsLimits;

      const maxPointPerAttribute = 90;
      const checkPoints = attr1 <= maxPointPerAttribute
        && attr2 <= maxPointPerAttribute && attr3 <= maxPointPerAttribute;

      const checkNegativeAttributes = attr1 >= 0 && attr2 >= 0 && attr3 >= 0;

      const validation = checkFieldInputs
      && checkLessThan && checkPoints && checkNegativeAttributes;

      return { isSaveButtonDisabled: !validation };
    });
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
    this.checkSaveButton();
  }

  onSaveButtonClick = (e) => {
    e.preventDefault();

    this.setState((prevState) => {
      const {
        cardName,
        cardDescription,
        cardAttr1,
        cardAttr2,
        cardAttr3,
        cardImage,
        cardRare,
        cardTrunfo,
      } = this.state;
      const card = {
        cardName,
        cardDescription,
        cardImage,
        cardAttr1,
        cardAttr2,
        cardAttr3,
        cardRare,
        cardTrunfo,
      };
      return {
        cardCollection: [...prevState.cardCollection, card],
        cardName: '',
        cardDescription: '',
        cardImage: '',
        cardAttr1: 0,
        cardAttr2: 0,
        cardAttr3: 0,
        cardRare: 'normal',
        hasTrunfo: cardTrunfo,
        isSaveButtonDisabled: true,
      };
    });
  };

  onDeleteCardClick = (cardText) => {
    const { cardCollection } = this.state;
    const card = cardCollection.find(({ cardName }) => cardName === cardText);
    this.setState({ cardCollection:
        cardCollection.filter(({ cardName }) => cardName !== cardText),
    hasTrunfo: !card.cardTrunfo,
    cardTrunfo: !card.cardTrunfo });
  }

  cardsCollectionFiltered = () => {
    const { cardCollection, filterCard } = this.state;
    return cardCollection.filter(({ cardName }) => cardName.includes(filterCard));
  }

  render() {
    const {
      cardName,
      cardDescription,
      cardImage,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardRare,
      cardTrunfo,
      isSaveButtonDisabled,
      hasTrunfo,
      filterCard,
    } = this.state;
    return (
      <div>
        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardImage={ cardImage }
          cardAttr1={ cardAttr1.toString() }
          cardAttr2={ cardAttr2.toString() }
          cardAttr3={ cardAttr3.toString() }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          hasTrunfo={ hasTrunfo }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardImage={ cardImage }
          cardAttr1={ cardAttr1.toString() }
          cardAttr2={ cardAttr2.toString() }
          cardAttr3={ cardAttr3.toString() }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          isPreview
        />
        <div>
          <label htmlFor="filtro">
            Filtro de Busca
            <input
              type="text"
              name="filterCard"
              id="filtro"
              data-testid="name-filter"
              value={ filterCard }
              onChange={ this.onInputChange }
            />
          </label>
          {this.cardsCollectionFiltered().map((card) => (
            <Card
              key={ card.cardName }
              cardName={ card.cardName }
              cardDescription={ card.cardDescription }
              cardImage={ card.cardImage }
              cardAttr1={ card.cardAttr1.toString() }
              cardAttr2={ card.cardAttr2.toString() }
              cardAttr3={ card.cardAttr3.toString() }
              cardRare={ card.cardRare }
              cardTrunfo={ card.cardTrunfo }
              isPreview={ false }
              onDeleteCardClick={ this.onDeleteCardClick }
            />))}
        </div>
      </div>
    );
  }
}

export default App;
