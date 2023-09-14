import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { List, Divider } from 'react-native-paper';

const Accordion = ({ title, options, selectedOption, setSelectedOption }) => {
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => {
    setExpanded(!expanded);
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <List.Item
          title={title}
          left={() => <List.Icon icon={expanded ? 'chevron-up' : 'chevron-down'} />}
        />
      </TouchableOpacity>
      {expanded && (
        <View>
          {options.map((option) => (
            <List.Item
              key={option.value}
              title={option.label}
              onPress={() => setSelectedOption(option.value)}
              left={() => (
                <List.Icon
                  icon={selectedOption === option.value ? 'check' : 'circle'}
                  color={selectedOption === option.value ? 'green' : 'gray'}
                />
              )}
            />
          ))}
          <Divider />
        </View>
      )}
    </View>
  );
};

export default Accordion;
