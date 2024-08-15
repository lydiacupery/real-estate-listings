import React, { useState, useEffect } from "react";
import {
  Divider,
  Link,
  Button,
  Text,
  Input,
  Flex,
  hubspot,
  LoadingSpinner
} from "@hubspot/ui-extensions";

// Define the extension to be run within the Hubspot CRM
hubspot.extend(({ context, runServerlessFunction, actions }) => (
  <Extension
    context={context}
    runServerless={runServerlessFunction}
    sendAlert={actions.addAlert}
    fetchProperties={actions.fetchCrmObjectProperties}
  />
));

// Define the Extension component, taking in runServerless, context, & sendAlert as props
const Extension = ({ context, runServerless, sendAlert, fetchProperties }) => {
  const [text, setText] = useState("");
  const [zip, setZip] = useState(null);


  // Call serverless function to execute with parameters.
  // The `myFunc` function name is configured inside `serverless.json`
  const handleClick = async () => {
    const { response } = await runServerless({ name: "myFunc", parameters: { text: text } });
    sendAlert({ message: response });
  };

  useEffect(() => {
    fetchProperties(['name', 'email', 'zip']).then((properties) => {
      setZip(properties.zip)
      console.log(properties)
    });
  }, [fetchProperties]);
  
  if (zip === null) {
    return (
      <LoadingSpinner></LoadingSpinner> 
    )
  }

  if (zip === "" || zip === undefined) {
    return (
      <Text format={{ fontWeight: "bold" }}>
        You don't have a valid Postal code.
      </Text>
    )
  }

  return (
    <>
      <Text>
        <Text format={{ fontWeight: "bold" }}>
          See your real estate listings below!!!
        </Text>
        Congratulations, {context.user.firstName}! We found you some great houses.
      </Text>
      {/* <Flex direction="row" align="end" gap="small">
        <Input name="text" label="Send" onInput={(t) => setText(t)} />
        <Button type="submit" onClick={handleClick}>
          Click me
        </Button>
      </Flex>
      <Divider /> */}
      {/* <Text>
        What now? Explore all available{" "}
        <Link href="https://developers.hubspot.com/docs/platform/ui-extension-components">
          UI components
        </Link>
        , get an overview of{" "}
        <Link href="https://developers.hubspot.com/docs/platform/ui-extensions-overview">
          UI extensions
        </Link>
        , learn how to{" "}
        <Link href="https://developers.hubspot.com/docs/platform/create-ui-extensions">
          add a new custom card
        </Link>
        , jump right in with our{" "}
        <Link href="https://developers.hubspot.com/docs/platform/ui-extensions-quickstart">
          Quickstart Guide
        </Link>
        , or check out our{" "}
        <Link href="https://github.com/HubSpot/ui-extensions-react-examples">
          code Samples
        </Link>
        .
      </Text> */}
    </>
  );
};
