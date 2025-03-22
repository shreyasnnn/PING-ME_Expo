import React from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import SearchIcon from '../../../../assets/options/SearchIcon';
const SearchBar = ({isSearchActive, setIsSearchActive}) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search a contact"
        placeholderTextColor="#666"
        style={styles.input}
      />
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => {
          setIsSearchActive(false);
        }}>
        <SearchIcon />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 4,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginHorizontal: 16,
    marginTop: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  iconContainer: {
    padding: 5,
  },
});

export default SearchBar;
