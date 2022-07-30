import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Card.module.css';

export default class Card extends Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      isPreview,
      onDeleteCardClick,
    } = this.props;

    return (
      <div className={ styles.container }>
        <div className={ styles.containerImg }>
          <img
            src={ cardImage }
            alt={ cardName }
            data-testid="image-card"
          />
        </div>
        <div>
          <h1 data-testid="name-card" className={ styles.titleCard }>
            {cardName}
          </h1>
          <p data-testid="description-card">{cardDescription}</p>
          <div className={ styles.attributes }>
            <p data-testid="attr1-card">{cardAttr1}</p>
            <p data-testid="attr2-card">{cardAttr2}</p>
            <p data-testid="attr3-card">{cardAttr3}</p>
          </div>
          <span data-testid="rare-card">{cardRare}</span>
          {cardTrunfo && <span data-testid="trunfo-card">Super Trunfo</span>}
        </div>
        {isPreview ? '' : (
          <button
            type="reset"
            data-testid="delete-button"
            onClick={ () => onDeleteCardClick(cardName) }
          >
            Excluir
          </button>)}
      </div>
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  isPreview: PropTypes.bool.isRequired,
  onDeleteCardClick: PropTypes.func,
};

Card.defaultProps = {
  onDeleteCardClick: () => {},
};
