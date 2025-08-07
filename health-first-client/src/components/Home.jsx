// components/Home.jsx
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Typography,
  Grid,
  Box,
  Avatar,
  CardActionArea,
} from '@mui/material';
import { LocalHospital, Person } from '@mui/icons-material';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: '100vh',
        background: 'linear-gradient(to right, #e0f7fa, #f1f8e9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        {/* Provider Card */}
        <Grid item>
          <Card
            sx={{
              width: 350,
              height: 250,
              borderRadius: 4,
              boxShadow: 6,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-10px)',
              },
            }}
          >
            <CardActionArea
              onClick={() => navigate('/provider-login')}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Avatar sx={{ bgcolor: '#0288d1', width: 64, height: 64, mb: 2 }}>
                <LocalHospital fontSize="large" />
              </Avatar>
              <Typography variant="h6" fontWeight={600}>
                Provider
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>
                Login as Doctor / Consultant
              </Typography>
            </CardActionArea>
          </Card>
        </Grid>

        {/* Patient Card */}
        <Grid item>
          <Card
            sx={{
              width: 350,
              height: 250,
              borderRadius: 4,
              boxShadow: 6,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-10px)',
              },
            }}
          >
            <CardActionArea
              onClick={() => navigate('/patient-login')}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Avatar sx={{ bgcolor: '#43a047', width: 64, height: 64, mb: 2 }}>
                <Person fontSize="large" />
              </Avatar>
              <Typography variant="h6" fontWeight={600}>
                Patient
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>
                Login as Patient / User
              </Typography>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
