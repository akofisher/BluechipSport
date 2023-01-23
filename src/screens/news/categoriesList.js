import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import { API } from "services";
import { cxs } from "styles";

export const CategoriesList = React.memo((props) => {
  const [categories, setCategories] = useState([]);
  const { openLeague } = props;

  useEffect(() => {
    API.getCategories().then(({ data }) => {
      setCategories(data);
    });
  }, []);

  const renderItem = useCallback(({ item }) => {
    return (
      <TouchableOpacity style={[cxs.pl20, cxs.p10]} onPress={() => openLeague(item.id)}>
        <Text style={styles.categoryText}>{item.title}</Text>
      </TouchableOpacity>
    );
  }, []);

  return (
    <FlatList
      style={{ height: 40 }}
      listKey="categories"
      horizontal
      keyExtractor={(item) => item.id?.toString()}
      data={categories}
      renderItem={renderItem}
    />
  );
});

const styles = StyleSheet.create({
  categoryText: {
    fontSize: 15,
    color: "white",
    fontWeight: "500",
  },
});
