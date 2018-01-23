import React, {Fragment} from 'react'

function MyPanels({
  arrayofpanels,
  decodedToken
}) {

  return (
    <Fragment>
    <FoxbatLogo />
    
    <div className="welcome-container">
      <h1>Welcome back to the Foxbat Instrument Panel Configurator</h1>
      <h2>Saved panels for {decodedToken.email}</h2>

      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Isbn</th>
            <th>Publisher</th>
            <th>Genre</th>
            <th>Publish date</th>
            <th colspan="3"></th>
          </tr>
        </thead>

        <tbody>
          <% @books.each do |book| %>
            <tr>
              <td><%= book.title %></td>
              <td><%= book.author %></td>
              <td><%= book.ISBN %></td>
              <td><%= book.publisher %></td>
              <td><%= book.genre %></td>
              <td><%= book.publish_date %></td>
              <td><%= link_to 'Show', book, class:"btn btn-success btn-xs" %></td>
              <td><%= link_to 'Edit', edit_book_path(book), class:"btn btn-primary btn-xs" %></td>
              <td><%= link_to 'Destroy', book, method: :delete, data: { confirm: 'Are you sure?' }, class:"btn btn-danger btn-xs" %></td>
            </tr>
          <% end %>
        </tbody>
      </table>
      
      { !signedIn &&
      <Button
        text="Sign In"
        onToggle = { (event) => {
          doModalWindow({ name: 'signIn' })
        } }
      />
      }
      { signedIn &&
        <Button
          text="Sign Out"
          onToggle={ onSignOut }
        />
      }
    </div>
  </Fragment>

    My saved panels
    arrayofpanels.map panel
    panel.type, panel.name, panel.integer
  )
}

export default MyPanels