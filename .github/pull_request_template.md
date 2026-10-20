# Checklist for maintainer updates

> [!IMPORTANT]
> **Not all projects are in `project-maintainers.csv`.** Projects using `.project` have their active maintainers listed in [`project-maintainers-.project.csv`](project-maintainers-.project.csv), which is generated automatically. Update `maintainers.yaml` in your project's own `.project` repository and follow the project's review process. For a multi-project repository, update the file in the relevant project directory. Do not edit the generated CSV directly.
>
> **Do not add a new project to `project-maintainers.csv`.** It is a legacy list for projects not yet using `.project`. Adding `.project/maintainers.yaml` alone does not add a project to the CNCF maintainer list. Contact CNCF staff at cncf-maintainer-changes@cncf.io to have the project's maintainer records set up.
>
> Access to the CNCF Service Desk and project maintainer mailing lists is controlled by the link between a maintainer's GitHub handle and their LFID, which can be updated at [openprofile.dev](https://openprofile.dev). Your name and affiliation shown in [`project-maintainers-.project.csv`](project-maintainers-.project.csv) are also taken from your LFID.

> [!NOTE]  
> **Delete this template if you're not changing the CSV file**

- [ ] You've provided a link to documentation where the project has approved the maintainer changes.
- [ ] The maintainer(s) also created or updated their [LFX Individual Dashboard profile](https://openprofile.dev/).
- [ ] You've sent an email with the list of email address(es) to <cncf-maintainer-changes@cncf.io> for invitations to Service Desk and mailing lists. You can just mark this complete if you are only removing people.
- [ ] Optional: You've also sent a PR with affiliation updates to [cncf/gitdm](https://github.com/cncf/gitdm?tab=readme-ov-file#cncf-gitdm).
