import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import styles from './App.module.css';

import './global.css';

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
      searchRare: '',
      checkDeckTrunfo: false,
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

  checkCardTrunfo = () => {
    const { cardCollection } = this.state;
    if (cardCollection.some(({ cardTrunfo }) => cardTrunfo)) {
      this.setState({ hasTrunfo: true });
    } else {
      this.setState({ hasTrunfo: false });
    }
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
        cardTrunfo: false,
        isSaveButtonDisabled: true,
      };
    }, this.checkCardTrunfo);
  };

  onDeleteCardClick = (cardText) => {
    const { cardCollection } = this.state;
    this.setState({
      cardCollection: cardCollection
        .filter(({ cardName }) => cardName !== cardText),
      cardTrunfo: false,
    }, this.checkCardTrunfo);
  }

  cardsCollectionFiltered = () => {
    const { cardCollection, filterCard, searchRare, checkDeckTrunfo } = this.state;
    if (checkDeckTrunfo) {
      return cardCollection.filter(({ cardTrunfo }) => cardTrunfo);
    }
    return cardCollection
      .filter(({ cardName, cardRare }) => (
        cardName.includes(filterCard)
        && (!searchRare ? cardRare.includes(searchRare) : cardRare === searchRare)));
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
      searchRare,
      checkDeckTrunfo,
    } = this.state;
    return (
      <div className={ styles.app }>
        <div className={ styles.forms }>
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
          <div className={ styles.containerCard }>
            <h1 className={ styles.title }>Pré-visualização</h1>
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
          </div>
        </div>
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
              disabled={ !!checkDeckTrunfo }
            />
          </label>
          <label htmlFor="searchRarity">
            <select
              id="searchRarity"
              data-testid="rare-filter"
              name="searchRare"
              onChange={ this.onInputChange }
              value={ searchRare }
              disabled={ !!checkDeckTrunfo }
            >
              <option value="">todas</option>
              <option value="normal">normal</option>
              <option value="raro">raro</option>
              <option value="muito raro">muito raro</option>
            </select>
          </label>
          <label htmlFor="isTrunfo">
            <input
              type="checkbox"
              data-testid="trunfo-filter"
              id="isTrunfo"
              name="checkDeckTrunfo"
              checked={ checkDeckTrunfo }
              onChange={ this.onInputChange }
            />
            Super Trunfo
          </label>
          {this.cardsCollectionFiltered().map((card) => (
            <Card
              key={ card.cardName + card.cardDescription }
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
