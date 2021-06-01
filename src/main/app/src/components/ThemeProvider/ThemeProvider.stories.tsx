/*-
 * #%L
 * Baleen 3
 * %%
 * Copyright (C) 2020 Dstl
 * %%
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * #L%
 */
/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import * as C from '@committed/components'
import React, { useState } from 'react'
import { ThemeProvider } from '.'

export default {
  title: 'ThemeProvider',
  component: ThemeProvider,
}

const Background: React.FC = ({
  children,
}: {
  readonly children?: React.ReactNode
}) => (
  <C.Box p={3} bgcolor="background.default">
    {children}
  </C.Box>
)

const Overview: React.FC = () => {
  const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ]
  const [form, setForm] = useState({
    name: 'Cat in the Hat',
    age: '',
    multiline: 'Controlled',
    currency: 'EUR',
  })
  const handleChange =
    (name: string) =>
    (event: React.ChangeEvent<HTMLInputElement>): void =>
      setForm({ ...form, [name]: event.target.value })

  const [checked, setChecked] = useState(true)

  const [tab, setTab] = useState(0)
  function handleTabChange(
    _event: React.ChangeEvent<{}>,
    newValue: number
  ): void {
    setTab(newValue)
  }

  return (
    <>
      <C.Caption>
        <C.Text>Buttons</C.Text>
      </C.Caption>
      <C.Column flexWrap="wrap">
        <C.Card
          display="flex"
          flexGrow={1}
          p={3}
          m={1}
          justifyContent="space-evenly"
        >
          <C.Column>
            <C.Button m={3}>Default</C.Button>
            <C.Button m={3} color="primary">
              Primary
            </C.Button>
            <C.Button m={3} color="secondary">
              Secondary
            </C.Button>
          </C.Column>
          <C.Column>
            <C.Button m={3} variant="text">
              Default
            </C.Button>
            <C.Button m={3} variant="text" color="primary">
              Primary
            </C.Button>
            <C.Button m={3} variant="text" color="secondary">
              Secondary
            </C.Button>
          </C.Column>
          <C.Column>
            <C.Button disabled={true} m={3}>
              Default
            </C.Button>
            <C.Button disabled={true} m={3} color="primary">
              Primary
            </C.Button>
            <C.Button disabled={true} m={3} color="secondary">
              Secondary
            </C.Button>
          </C.Column>
        </C.Card>
        <C.Caption>
          <C.Text>Icon Buttons</C.Text>
        </C.Caption>
        <C.Card
          display="flex"
          flexGrow={1}
          p={3}
          m={1}
          justifyContent="space-evenly"
        >
          <C.IconButton aria-label="delete">
            <C.Icons.Delete />
          </C.IconButton>
          <C.IconButton aria-label="delete" disabled color="primary">
            <C.Icons.Delete />
          </C.IconButton>
          <C.IconButton color="secondary" aria-label="add an alarm">
            <C.Icons.Alarm />
          </C.IconButton>
          <C.IconButton color="primary" aria-label="add to shopping cart">
            <C.Icons.AddShoppingCart />
          </C.IconButton>
        </C.Card>
        <C.Caption>
          <C.Text>Badges</C.Text>
        </C.Caption>
        <C.Card
          display="flex"
          flexGrow={1}
          p={3}
          pt={4}
          m={1}
          justifyContent="space-evenly"
        >
          <C.Badge badgeContent={'default'}>
            <C.IconButton>
              <C.Icons.Mail />
            </C.IconButton>
          </C.Badge>
          <C.Badge color="primary" badgeContent={4}>
            <C.IconButton>
              <C.Icons.Mail />
            </C.IconButton>
          </C.Badge>
          <C.Badge color="secondary" badgeContent={87}>
            <C.IconButton>
              <C.Icons.Mail />
            </C.IconButton>
          </C.Badge>
          <C.Badge color="error" badgeContent={1000}>
            <C.IconButton>
              <C.Icons.Mail />
            </C.IconButton>
          </C.Badge>
        </C.Card>
      </C.Column>
      <C.Caption>
        <C.Text>Avatars</C.Text>
      </C.Caption>
      <C.Card
        display="flex"
        flexGrow={1}
        p={3}
        pt={4}
        m={1}
        justifyContent="space-evenly"
      >
        <C.Avatar m={1} bgcolor="primary.main" color="primary.contrastText">
          CF
        </C.Avatar>
        <C.Avatar m={1} bgcolor="secondary.main" color="secondary.contrastText">
          SH
        </C.Avatar>
        <C.Avatar m={1}>
          <C.Icons.Folder />
        </C.Avatar>
        <C.Avatar m={1} bgcolor="black" color="white">
          <C.Icons.Pageview />
        </C.Avatar>
        <C.Avatar m={1} bgcolor="primary.light" color="text.primary">
          <C.Icons.Assignment />
        </C.Avatar>
      </C.Card>
      <C.Caption>
        <C.Text>Chips</C.Text>
      </C.Caption>
      <C.Card
        display="flex"
        flexGrow={1}
        p={3}
        m={1}
        justifyContent="space-evenly"
      >
        <C.Chip label="Chip" />
        <C.Chip
          icon={<C.Icons.Face />}
          label="Chip"
          // need to add function so action appears
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onClick={(): void => {}}
          // need to add function so action appears
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onDelete={(): void => {}}
          color="primary"
        />
        <C.Chip
          variant="outlined"
          icon={<C.Icons.AccountCircle />}
          label="Chip"
          // need to add function so action appears
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onClick={(): void => {}}
          color="secondary"
        />
      </C.Card>
      <C.Caption>
        <C.Text>Text Fields</C.Text>
      </C.Caption>
      <C.Card
        display="flex"
        flexGrow={1}
        p={3}
        pt={4}
        m={1}
        justifyContent="space-evenly"
      >
        <C.Form noValidate autoComplete="off">
          <C.Flex flexWrap="wrap" alignContent="space-between">
            <C.TextField
              flexGrow={1}
              m={3}
              id="standard-name"
              label="Name"
              value={form.name}
              onChange={handleChange('name')}
            />
            <C.TextField
              flexGrow={1}
              m={3}
              id="standard-uncontrolled"
              label="Uncontrolled"
              defaultValue="foo"
            />
            <C.TextField
              flexGrow={1}
              m={3}
              required
              id="standard-required"
              label="Required"
              defaultValue="Hello World"
            />
            <C.TextField
              flexGrow={1}
              m={3}
              error
              id="standard-error"
              label="Error"
              defaultValue="Hello World"
            />
            <C.TextField
              flexGrow={1}
              m={3}
              disabled
              id="standard-disabled"
              label="Disabled"
              defaultValue="Hello World"
            />
            <C.TextField
              flexGrow={1}
              m={3}
              id="standard-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
            <C.TextField
              flexGrow={1}
              m={3}
              id="standard-multiline-flexible"
              label="Multiline"
              multiline
              rowsMax="4"
              value={form.multiline}
              onChange={handleChange('multiline')}
            />
            <C.TextField
              flexGrow={1}
              m={3}
              id="standard-multiline-static"
              label="Multiline"
              multiline
              rows="4"
              defaultValue="Default Value"
            />
            <C.TextField
              flexGrow={1}
              m={3}
              id="standard-read-only-input"
              label="Read Only"
              defaultValue="Hello World"
              InputProps={{
                readOnly: true,
              }}
            />
            <C.TextField
              flexGrow={1}
              m={3}
              id="standard-helperText"
              label="Helper text"
              defaultValue="Default Value"
              helperText="Some important text"
            />
            <C.TextField
              flexGrow={1}
              m={3}
              id="standard-number"
              label="Number"
              value={form.age}
              onChange={handleChange('age')}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <C.TextField
              flexGrow={1}
              m={3}
              id="standard-select-currency"
              select
              label="Select"
              value={form.currency}
              onChange={handleChange('currency')}
              helperText="Please select your currency"
            >
              {currencies.map(
                (option: Readonly<{ value: string; label: string }>) => (
                  <C.MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </C.MenuItem>
                )
              )}
            </C.TextField>
            <C.TextField
              flexGrow={1}
              m={3}
              id="standard-select-currency-native"
              select
              label="Native select"
              value={form.currency}
              onChange={handleChange('currency')}
              SelectProps={{
                native: true,
              }}
              helperText="Please select your currency"
            >
              {currencies.map(
                (option: Readonly<{ value: string; label: string }>) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                )
              )}
            </C.TextField>
          </C.Flex>
        </C.Form>
      </C.Card>
      <C.Caption>
        <C.Text>Checkbox, Radio and Switch</C.Text>
      </C.Caption>
      <C.Card
        display="flex"
        flexGrow={1}
        p={3}
        pt={4}
        m={1}
        justifyContent="space-evenly"
      >
        <C.Column justifyContent="center">
          <C.Checkbox
            checked={checked}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
              setChecked(event.target.checked)
            }
            color="primary"
          />
          <C.Checkbox
            checked={!checked}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
              setChecked(!event.target.checked)
            }
            color="secondary"
          />
        </C.Column>
        <C.Column justifyContent="center">
          <C.Radio
            checked={checked}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
              setChecked(event.target.checked)
            }
            color="primary"
          />
          <C.Radio
            checked={!checked}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
              setChecked(!event.target.checked)
            }
            color="secondary"
          />
        </C.Column>
        <C.Column justifyContent="center">
          <C.Switch
            checked={checked}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
              setChecked(event.target.checked)
            }
            color="primary"
          />
          <C.Switch
            checked={!checked}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
              setChecked(!event.target.checked)
            }
            color="secondary"
          />
        </C.Column>
      </C.Card>
      <C.Caption>
        <C.Text>Slider</C.Text>
      </C.Caption>
      <C.Card
        display="flex"
        flexGrow={1}
        flexDirection="column"
        p={3}
        pt={4}
        m={1}
      >
        <C.Slider m={3} flexGrow={1} aria-labelledby="continuous-slider" />
        <C.Slider
          m={3}
          flexGrow={1}
          defaultValue={80}
          step={10}
          valueLabelDisplay="on"
        />
        <C.Slider m={3} flexGrow={1} value={30} disabled={true} />
      </C.Card>
      <C.Caption>
        <C.Text>Lists</C.Text>
      </C.Caption>
      <C.Card
        display="flex"
        flexGrow={1}
        flexDirection="column"
        p={3}
        pt={4}
        m={1}
      >
        <C.Box minWidth={500} m={3} bgcolor="background.paper">
          <C.List component="nav" aria-label="main mailbox folders">
            <C.ListItem button>
              <C.ListItemIcon>
                <C.Icons.Inbox />
              </C.ListItemIcon>
              <C.ListItemText primary="Inbox" />
            </C.ListItem>
            <C.ListItem button>
              <C.ListItemIcon>
                <C.Icons.Drafts />
              </C.ListItemIcon>
              <C.ListItemText primary="Drafts" />
            </C.ListItem>
          </C.List>
          <C.Divider />
          <C.List component="nav" aria-label="secondary mailbox folders">
            <C.ListItem button>
              <C.ListItemText primary="Trash" />
            </C.ListItem>
            <C.ListItem button>
              <C.ListItemText primary="Spam" />
            </C.ListItem>
          </C.List>
        </C.Box>
      </C.Card>
      <C.Card
        display="flex"
        flexGrow={1}
        flexDirection="column"
        p={3}
        pt={4}
        m={1}
      >
        <C.Box minWidth={500} m={3} bgcolor="background.paper">
          <C.List>
            {['18 June 2014', '20 July 2015', '3 January 2018'].map(
              (item, index) => (
                <C.ListItem key={index} role={undefined} dense button>
                  <C.ListItemIcon>
                    <C.Checkbox
                      edge="start"
                      tabIndex={-1}
                      disableRipple
                      inputProps={{
                        'aria-labelledby': '1',
                      }}
                    />
                  </C.ListItemIcon>
                  <C.ListItemText
                    id={`${index}`}
                    primary={`Line item ${index + 1}`}
                    secondary={item}
                  />
                  <C.ListItemSecondaryAction>
                    <C.IconButton edge="end">
                      <C.Icons.Comment />
                    </C.IconButton>
                  </C.ListItemSecondaryAction>
                </C.ListItem>
              )
            )}
          </C.List>
        </C.Box>
      </C.Card>
      <C.Caption>
        <C.Text>Cards</C.Text>
      </C.Caption>
      <C.Card display="flex" flexGrow={1} flexWrap="wrap" p={3} pt={4} m={1}>
        <C.Card m={3} elevation={3}>
          <C.Box height={100} bgcolor="primary.main" />
          <C.CardHeader bgcolor="primary.main" color="primary.contrastText">
            Committed Card
          </C.CardHeader>
          <C.CardContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Id nibh
            tortor id aliquet lectus. Feugiat nibh sed pulvinar proin gravida
            hendrerit lectus. Facilisis magna etiam tempor orci eu lobortis
            elementum.
          </C.CardContent>
          <C.CardActions>
            <C.Button color="primary" variant="text">
              Yes
            </C.Button>
            <C.Button color="primary" variant="text">
              No
            </C.Button>
          </C.CardActions>
        </C.Card>
        <C.Card m={3} elevation={6}>
          <C.CardHeader bgcolor="secondary.main" color="secondary.contrastText">
            Card
          </C.CardHeader>
          <C.CardActions>
            <C.Checkbox
              icon={
                <C.Icons.FavoriteBorder style={{ color: C.colors.grey[600] }} />
              }
              checkedIcon={<C.Icons.Favorite style={{ color: 'red' }} />}
            />
            <C.Checkbox
              icon={
                <C.Icons.BookmarkBorder style={{ color: C.colors.grey[600] }} />
              }
              checkedIcon={
                <C.Icons.Bookmark style={{ color: C.colors.lightBlue[400] }} />
              }
            />
            <C.IconButton>
              <C.Icons.Share />
            </C.IconButton>
          </C.CardActions>
        </C.Card>
        <C.Card elevation={8}>
          <C.Flex>
            <C.CardContent>
              <C.Heading.h5 mb={1}>Title</C.Heading.h5>
              <C.Subheading.h5 mt={0} mb={2} color="textSecondary">
                Subtitle
              </C.Subheading.h5>
              <C.Flex alignItems="center" p={3}>
                <C.IconButton size="small">
                  <C.Icons.SkipPrevious fontSize="small" />
                </C.IconButton>
                <C.IconButton>
                  <C.Icons.PlayArrow fontSize="large" />
                </C.IconButton>
                <C.IconButton size="small">
                  <C.Icons.SkipNext fontSize="small" />
                </C.IconButton>
              </C.Flex>
            </C.CardContent>
            <C.CardMedia
              width="200px"
              height="200px"
              image="https://picsum.photos/id/645/200/200"
              title="Picsum"
            />
          </C.Flex>
        </C.Card>
      </C.Card>
      <C.Caption>
        <C.Text>Tables</C.Text>
      </C.Caption>
      <C.Card
        display="flex"
        flexGrow={1}
        flexDirection="column"
        p={3}
        pt={4}
        m={1}
      >
        <C.Box m={2} p={3} bgcolor="background.paper">
          <C.Table>
            <C.TableHead>
              <C.TableRow>
                <C.TableCell>Dessert (100g serving)</C.TableCell>
                <C.TableCell align="right">Calories</C.TableCell>
                <C.TableCell align="right">Fat&nbsp;(g)</C.TableCell>
                <C.TableCell align="right">Carbs&nbsp;(g)</C.TableCell>
                <C.TableCell align="right">Protein&nbsp;(g)</C.TableCell>
              </C.TableRow>
            </C.TableHead>
            <C.TableBody>
              {[
                ['Frozen yoghurt', 159, 6.0, 24, 4.0],
                ['Ice cream sandwich', 237, 9.0, 37, 4.3],
                ['Eclair', 262, 16.0, 24, 6.0],
                ['Cupcake', 305, 3.7, 67, 4.3],
                ['Gingerbread', 356, 16.0, 49, 3],
              ].map((row) => (
                <C.TableRow key={row[0]}>
                  <C.TableCell component="th" scope="row">
                    {row[0]}
                  </C.TableCell>
                  <C.TableCell align="right">{row[1]}</C.TableCell>
                  <C.TableCell align="right">{row[2]}</C.TableCell>
                  <C.TableCell align="right">{row[3]}</C.TableCell>
                  <C.TableCell align="right">{row[4]}</C.TableCell>
                </C.TableRow>
              ))}
            </C.TableBody>
          </C.Table>
        </C.Box>
      </C.Card>
      <C.Caption>
        <C.Text>Tabs</C.Text>
      </C.Caption>
      <C.Card
        display="flex"
        flexGrow={1}
        flexDirection="column"
        p={3}
        pt={4}
        m={1}
      >
        <C.Box>
          <C.AppBar position="static">
            <C.Tabs
              value={tab}
              onChange={handleTabChange}
              aria-label="simple tabs example"
            >
              <C.Tab label="Item One" />
              <C.Tab label="Item Two" />
              <C.Tab label="Item Three" />
            </C.Tabs>
          </C.AppBar>
          <C.TabPanel p={3} selected={tab} index={0}>
            Item One
          </C.TabPanel>
          <C.TabPanel p={3} selected={tab} index={1}>
            Item Two
          </C.TabPanel>
          <C.TabPanel p={3} selected={tab} index={2}>
            Item Three
          </C.TabPanel>
        </C.Box>
      </C.Card>
      <C.Caption>
        <C.Text>Typography</C.Text>
      </C.Caption>
      <C.Card display="flex" flexGrow={1} p={3} pt={4} m={1}>
        <C.Box width={1}>
          <C.Heading.h1 gutterBottom>h1. Heading</C.Heading.h1>
          <C.Heading.h2 gutterBottom>h2. Heading</C.Heading.h2>
          <C.Heading.h3 gutterBottom>h3. Heading</C.Heading.h3>
          <C.Heading.h4 gutterBottom>h4. Heading</C.Heading.h4>
          <C.Subheading.h3 gutterBottom>
            subheading. Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Quos blanditiis tenetur
          </C.Subheading.h3>
          <C.Typography variant="body1" gutterBottom>
            body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore
            consectetur.
          </C.Typography>
          <C.Typography variant="body2" gutterBottom>
            body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore
            consectetur.
          </C.Typography>
          <C.Monospace wrap>
            Monospace. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore
            consectetur.
          </C.Monospace>
        </C.Box>
      </C.Card>
    </>
  )
}

export const LightThemeOverview: React.FC = () => {
  return (
    // The theme provider is added by the storybook decorator, just re-adding here to show use.
    <ThemeProvider choice="light">
      <Background>
        <Overview />
      </Background>
    </ThemeProvider>
  )
}

export const DarkThemeOverview: React.FC = () => {
  return (
    // The theme provider is added by the storybook decorator, just re-adding here to show use.
    <ThemeProvider choice="dark">
      <Background>
        <Overview />
      </Background>
    </ThemeProvider>
  )
}
