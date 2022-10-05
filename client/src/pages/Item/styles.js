import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  pageItem: {
    width: "100%",
    maxWidth: "1100px",
    margin: "0 auto",

    '& main': {
      margin: "20px auto 80px auto",
      maxWidth: "730px",
      background: "#FFF",
      borderRadius: "8px",
    
      display: "flex",
      flexDirection: "column",

      '& header': {
        display: "flex",
        alignItems: "center",
    
        '& a': {
          margin: "1rem auto 0.5rem 1.5rem",
        }
      },

      '& section': {
        // display: "flex",
        // flexDirection: "row",
        // justifyContent: "center",
        
        '& figure': {
          height: "350px",
          
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          outline: "0",

          '& img': {
            width: "100% !important",
            height: "100% !important",
            objectFit: "cover !important",
            borderRadius: "10px",
          },
        },

        '& fieldset': {
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          border: "0",
        }
      },
    }
  },

  sellBadge: {
    fontSize: "0.9rem",
    height: "1.4rem",
    marginLeft: "auto",
    color: "white",
    backgroundColor: "red",
    '&:active': {
      boxShadow: 'none',
      backgroundColor: "#DDE1E3"
    },
  },
  buyBadge: {
    fontSize: "0.9rem",
    height: "1.4rem",
    marginLeft: "auto",
    color: "white",
    backgroundColor: "#00BE7A",
    '&:active': {
      boxShadow: 'none',
      backgroundColor: "#DDE1E3"
    },
  },

  buttons: {
    flex: 1,
    flexDirection: 'row',
    marginRight: '10px',
    justifyContent: "space-around",
    padding:5
  }

});

export { useStyles };