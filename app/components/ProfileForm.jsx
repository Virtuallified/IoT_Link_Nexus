"use client";

import React from "react";
import { useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Card, Container, Content, Flex, Panel } from "@radix-ui/themes";

const ProfileForm = ({ handleSubmit }) => {
  const user = useSelector((state) => state.user);

  return (
    <Container>
      <Panel>
        <Content>
          <Card>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Email:</label>
                <Field name="email" component="input" type="email" disabled />
              </div>
              <div>
                <label>Name:</label>
                <Field name="name" component="input" type="text" />
              </div>
              <Flex align="center" justify="end">
                <button type="submit">Update Profile</button>
              </Flex>
            </form>
          </Card>
        </Content>
      </Panel>
    </Container>
  );
};

export default reduxForm({ form: "profile" })(ProfileForm);
