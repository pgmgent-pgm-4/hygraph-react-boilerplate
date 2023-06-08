// Import external modules
import { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
  Row,
  FormGroup,
  Label
} from "reactstrap";
import { useAuth } from "../context";

const Signin = () => {
  const [formData, setFormData] = useState({
    txtUsername: '',
    txtPassword: '',
  });

  const { signInWithEmailAndPassword } = useAuth();

  const handleOnChange = async (ev) => {
    setFormData({
      ...formData,
      [ev.target.name]: (ev.target.type !== 'checkbox') ? ev.target.value : ev.target.checked,
    })
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    signInWithEmailAndPassword(formData.txtUsername, formData.txtPassword)
  };

  return (
    <Card>
      <Form onSubmit={handleSubmit} className="form">
        <Row>
          <FormGroup>
            <Label for="txtUsername">Username</Label>
            <Input 
              id="txtUsername"
              name="txtUsername"
              placeholder="Write your username"
              type="text"
              onChange={handleOnChange} value={formData.txtUsername}
            />
          </FormGroup>
          <FormGroup>
            <Label for="txtPassword">Password</Label>
            <Input 
              id="txtPassword"
              name="txtPassword"
              placeholder="Write your password"
              type="password"
              onChange={handleOnChange} value={formData.txtPassword}
            />
          </FormGroup>
        </Row>
        <Button type="submit">Sign in</Button>
      </Form>
    </Card>
  );
};

export default Signin;