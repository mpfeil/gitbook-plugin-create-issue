# gitbook-plugin-create-issue

This GitBook plugin adds a button to the toolbar and lets the user report an issue and creates it for you on GitHub.

## How to use

Configure the plugin in your ```book.json```:

```
{
  "plugins": ["create-issue"],
  "pluginsConfig": {
    "create-issue": {
      "label": {
        "en": "Report issue",
        "de": "Fehler melden"
      },
      "labelSubmitButton": {
        "en": "Submit",
        "de": "Erstellen"
      },
      "labelCancelButton": {
        "en": "Cancel",
        "de": "Abbrechen"
      },
      "placeholder": {
        "title": {
          "en": "Title",
          "de": "Titel"
        },
        "text": {
          "en": "Leave a comment.",
          "de": "Fehlerbeschreibung"
        }
      },
      "github": {
        "repo": "USER/REPO",
        "token": "YOUR_GITHUB_TOKEN"        
      },
      "alert": {
        "info": {
          "de":"Ihr Ticket wurde erfolgreich angelegt.",
          "en":"Your issue was created successfully."
        },
        "danger": {
          "de":"Ihr Ticket konnte nicht erfolgreich angelegt werden.",
          "en":"Your issue was not created successfully."
        }
      }
    }
  }
}
```

## GitHub Token

To aquire your GitHub Token go to https://github.com/settings/tokens

## License
MIT