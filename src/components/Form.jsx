import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Form.module.css';

export default class Form extends Component {
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
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;

    const inputCheckboxTrunfo = (
      <label htmlFor="#" className={ styles.trunfo }>
        <input
          data-testid="trunfo-input"
          type="checkbox"
          name="cardTrunfo"
          checked={ cardTrunfo }
          onChange={ onInputChange }
        />
        Super Trunfo
      </label>
    );
    const inputCheckboxDisabled = (
      <span>Você já tem um Super Trunfo em seu baralho</span>
    );
    return (
      <div className={ styles.container }>
        <h1 className={ styles.title }>Adicionar nova carta</h1>
        <form className={ styles.form }>
          <label htmlFor="#" className={ styles.column }>
            Nome
            <input
              data-testid="name-input"
              type="text"
              name="cardName"
              value={ cardName }
              onChange={ onInputChange }
            />
          </label>

          <label htmlFor="area" className={ styles.column }>
            Descrição
            <textarea
              data-testid="description-input"
              name="cardDescription"
              cols="20"
              rows="5"
              value={ cardDescription }
              onChange={ onInputChange }
            />
          </label>

          <label htmlFor="#" className={ styles.containerAtributo }>
            Attr01
            <input
              name="cardAttr1"
              data-testid="attr1-input"
              type="number"
              value={ cardAttr1 }
              onChange={ onInputChange }
            />
          </label>

          <label htmlFor="#" className={ styles.containerAtributo }>
            Attr02
            <input
              name="cardAttr2"
              data-testid="attr2-input"
              type="number"
              value={ cardAttr2 }
              onChange={ onInputChange }
            />
          </label>

          <label htmlFor="#" className={ styles.containerAtributo }>
            Attr03
            <input
              name="cardAttr3"
              data-testid="attr3-input"
              type="number"
              value={ cardAttr3 }
              onChange={ onInputChange }
            />
          </label>

          <label htmlFor="#" className={ styles.imagem }>
            Imagem
            <input
              name="cardImage"
              data-testid="image-input"
              type="text"
              value={ cardImage }
              onChange={ onInputChange }
            />
          </label>

          <label htmlFor="raridade" className={ styles.column }>
            Raridade
            <select
              id="raridade"
              value={ cardRare }
              onChange={ onInputChange }
              name="cardRare"
              data-testid="rare-input"
            >
              <option value="normal">normal</option>
              <option value="raro">raro</option>
              <option value="muito raro">muito raro</option>
            </select>
          </label>
          {hasTrunfo ? inputCheckboxDisabled : inputCheckboxTrunfo }
          <button
            className={ styles.saveButton }
            type="submit"
            data-testid="save-button"
            onClick={ onSaveButtonClick }
            disabled={ isSaveButtonDisabled }
          >
            Salvar
          </button>
        </form>

      </div>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};
