'use client'
import * as React from 'react';
import { useRouter } from 'next/navigation'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import StarIcon from '@mui/icons-material/StarBorder';

const links = [{
    title: 'Episodes',
    subheader: 'Most popular',
    href: '/episodes',
    description: ['id', 'name', 'air_date', 'episode', 'characters', 'url', 'created'],
    buttonText: 'View',
    buttonVariant: 'contained',
}, {
    title: 'Characters',
    subheader: 'Most popular',
    href: '/characters',
    description: ['id', 'name', 'status', 'species', 'type', 'gender', 'created'],
    buttonText: 'View',
    buttonVariant: 'contained',
}, {
    title: 'Locations',
    subheader: 'Most popular',
    href: '/locations',
    description: ['20 users included',
        '10 GB of storage',
        'Help center access',
        'Priority email support',],
    buttonText: 'View',
    buttonVariant: 'outlined',
}];

export default function Page() {
    const router = useRouter()
  return (
      <Box>
          <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
              <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="text.primary"
                  gutterBottom
              >
                  Links
              </Typography>
              <Typography variant="h5" align="center" color="text.secondary" component="p">
                  Quickly build an effective pricing table for your potential customers with
                  this layout. It&apos;s built with default MUI components with little
                  customization.
              </Typography>
          </Container>
          <Container maxWidth="md" component="main">
              <Grid container spacing={5} alignItems="flex-end">
                  {links.map((link) => (
                      <Grid
                          item
                          key={link.title}
                          xs={12}
                          sm={link.title === 'Enterprise' ? 12 : 6}
                          md={4}
                      >
                          <Card>
                              <CardHeader
                                  title={link.title}
                                  subheader={link.subheader}
                                  titleTypographyProps={{ align: 'center' }}
                                  action={link.title === 'Pro' ? <StarIcon /> : null}
                                  subheaderTypographyProps={{
                                      align: 'center',
                                  }}
                                  sx={{
                                      backgroundColor: (theme) =>
                                          theme.palette.mode === 'light'
                                              ? theme.palette.grey[200]
                                              : theme.palette.grey[700],
                                  }}
                              />
                              <CardContent>
                                  <ul>
                                      {link.description.map((line) => (
                                          <Typography
                                              component="li"
                                              variant="subtitle1"
                                              align="center"
                                              key={line}
                                          >
                                              {line}
                                          </Typography>
                                      ))}
                                  </ul>
                              </CardContent>
                              <CardActions>
                                  <Button
                                      fullWidth
                                      variant={link.buttonVariant as 'outlined' | 'contained'}
                                        onClick={() => {
                                            router.push(link.href)
                                        }
                                        }
                                  >
                                      {link.buttonText}
                                  </Button>
                              </CardActions>
                          </Card>
                      </Grid>
                  ))}
              </Grid>
          </Container>
      </Box>
  )
}
