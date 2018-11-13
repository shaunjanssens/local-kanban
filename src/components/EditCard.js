// @flow
import React, { Component } from "react";
import styled from "styled-components";

import type { ItemType } from "../Types";

type PropTypes = {
  initialData: ?ItemType,
  toggleModal: Function,
  saveContact: Function
};

type StateTypes = ItemType;

const defaultInputStyle = `
display: block;
width: 100%;
margin-top: 8px;
height: 30px;
padding: 0 8px;
font-size: 13px;
background: #ffffff;
border: 1px solid #b1bbc4;
border-radius: 2px;
font-family: inherit;
outline: none;
`;

const Backlayer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(251, 253, 254, 0.7);
`;
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px 20px;
  width: 100%;
  max-width: 600px;
  padding: 20px;
  background: #ffffff;
  border: 1px solid #eff3f5;
  border-radius: 3px;
  box-shadow: 0 2px 10px 0 rgba(79, 100, 128, 0.06),
    0 6px 8px -6px rgba(79, 100, 128, 0.2);
`;
const Label = styled.label`
  display: block;
  font-size: 15px;
  font-weight: 500;
  color: #879aaa;

  ${props => {
    if (props.twoCols) {
      return `grid-column: 1 / 3`;
    }
  }};
`;
const Input = styled.input`
  ${defaultInputStyle};
`;
const Select = styled.select`
  ${defaultInputStyle};
  -webkit-appearance: none;
  -webkit-border-radius: 3px;
`;
const Option = styled.option``;
const TextArea = styled.textarea`
  ${defaultInputStyle};
  height: 150px;
  padding: 8px;
`;
const ButtonGroup = styled.div`
  display: flex;
  grid-column: 1 / 3;
`;
const Button = styled.div`
  ${defaultInputStyle};
  height: 40px;
  margin-top: 0;
  background: #b1bbc4;
  color: #ffffff;
  font-weight: 500;
  font-size: 15px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;

  ${props => {
    if (props.cancel) {
      return `
        flex: 1 0;
        margin-left: 15px;
        padding: 0 15px;
        background:#EEF3F5;
        color: #b1bbc4;
        border: none;
      `;
    }
  }};
`;

export default class EditCard extends Component<PropTypes, StateTypes> {
  state = {
    id: "",
    name: "",
    gender: "male",
    age: "",
    location: "",
    email: "",
    phone: "",
    notes: "",
    lastUpdated: "",
    picture: ""
  };

  componentWillMount = () => {
    const { initialData } = this.props;
    initialData && this.setState({ ...initialData });
  };

  handleInputChange = (event: SyntheticInputEvent<EventTarget>) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  render = () => {
    const { id, name, gender, age, email, phone, location, notes } = this.state;
    const { toggleModal, saveContact } = this.props;

    return (
      <Backlayer>
        <Container>
          <Label>
            Name
            <Input
              type="text"
              name="name"
              value={name}
              onChange={this.handleInputChange}
            />
          </Label>
          <Label>
            Gender
            <Select
              name="gender"
              defaultValue={gender}
              onChange={this.handleInputChange}
            >
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </Label>
          <Label>
            Age
            <Input
              type="text"
              name="age"
              value={age}
              onChange={this.handleInputChange}
            />
          </Label>
          <Label>
            Location
            <Input
              type="text"
              name="location"
              value={location}
              onChange={this.handleInputChange}
            />
          </Label>
          <Label>
            Email
            <Input
              type="text"
              name="email"
              value={email}
              onChange={this.handleInputChange}
            />
          </Label>
          <Label>
            Telephone
            <Input
              type="text"
              name="phone"
              value={phone}
              onChange={this.handleInputChange}
            />
          </Label>
          <Label twoCols>
            Notes
            <TextArea
              name="notes"
              value={notes}
              onChange={this.handleInputChange}
            />
          </Label>
          <ButtonGroup>
            <Button onClick={() => saveContact(this.state)}>
              {id ? "Change contact" : "Add contact"}
            </Button>
            <Button cancel onClick={toggleModal}>
              Close
            </Button>
          </ButtonGroup>
        </Container>
      </Backlayer>
    );
  };
}
