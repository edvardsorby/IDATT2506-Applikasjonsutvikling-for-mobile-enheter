import { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";

export default function Grid() {

  return (
    <View style={styles.board}>
        <View style={styles.row}>
          <View style={styles.cell}>
            <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/>
          </View>
          <View style={styles.cell}>
            <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/>
          </View>
          <View style={styles.cell}>
           <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/>
          </View>
          <View style={[styles.cell, styles.marginLeft]}>
            <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/>
          </View>
          <View style={styles.cell}>
            <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/>
          </View>
          <View style={[styles.cell, styles.marginRight]}>
            <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/>
          </View>
          <View style={styles.cell}>
           <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/>
          </View>
          <View style={styles.cell}>
           <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/>
          </View>
          <View style={styles.cell}>
            <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>           
           <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>       
               <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>        
              <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={[styles.cell, styles.marginLeft]}>  
                    <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>          
            <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={[styles.cell, styles.marginRight]}>    
                  <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>          
            <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>          
            <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>          
            <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>        
              <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>      
                <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>     
                 <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={[styles.cell, styles.marginLeft]}>       
               <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>      
                <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={[styles.cell, styles.marginRight]}>   
                   <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>       
               <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>       
               <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>       
               <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
        </View>
        <View style={[styles.row, styles.marginTop]}>
          <View style={styles.cell}>     
                 <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>     
                 <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>     
                 <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={[styles.cell, styles.marginLeft]}>      
                <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>       
               <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={[styles.cell, styles.marginRight]}>     
                 <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>     
                 <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>     
                 <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>     
                 <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>        
              <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>       
               <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>       
               <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={[styles.cell, styles.marginLeft]}>      
                <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>          
            <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={[styles.cell, styles.marginRight]}>       
               <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>      
                <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>       
               <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>       
               <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
        </View>
        <View style={[styles.row, styles.marginBottom]}>
          <View style={styles.cell}>     
                 <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>      
                <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>       
               <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={[styles.cell, styles.marginLeft]}>        
              <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>       
               <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={[styles.cell, styles.marginRight]}>       
               <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>      
                <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>      
                <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>      
                <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>      
                <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>      
                <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>        
              <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={[styles.cell, styles.marginLeft]}>     
                 <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>       
               <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={[styles.cell, styles.marginRight]}>   
                   <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>        
              <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>        
              <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>        
              <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>    
                  <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>     
                 <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>    
                  <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={[styles.cell, styles.marginLeft]}>  
                    <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>    
                  <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={[styles.cell, styles.marginRight]}>     
                 <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>      
                <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>     
                 <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>         
             <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>      
               <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>       
               <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>       
               <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={[styles.cell, styles.marginLeft]}>      
                <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>          
            <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={[styles.cell, styles.marginRight]}>   
                   <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>       
               <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>       
               <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
          <View style={styles.cell}>        
              <TextInput keyboardType="numeric" maxLength={1} style={styles.textInput}/></View>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  board: {
    backgroundColor: '#333333',
    display: 'flex',
    padding: 1,
  },
  row: {
    display: 'flex',
    flexDirection: 'row'
  },
  cell: {
    width: 30,
    height: 30,
    margin: 1,
    backgroundColor: 'white',
    textAlign: 'center'
  },
  marginLeft: {
    marginLeft: 3,
  },
  marginRight: {
    marginRight: 3,
  },
  marginTop: {
    marginTop: 3,
  },
  marginBottom: {
    marginBottom: 3,
  },
  textInput: {
    fontSize: 20,
    textAlign: 'center'
  }
})


