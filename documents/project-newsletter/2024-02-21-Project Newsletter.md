
Cloud Native Project Monthly (CNPM) February 2024 

February 21, 2024 

In this Edition: 
## Certification Expiration Changes
## Resource Provider Mega Thread
### OCI Credits - Now Available for Projects
### Equinix Updates
### New Policy On Resource Usage
### GitHub Action Runners
### Join the LFX Insights v3 Beta Pilot Program
### Use Scarf to Measure Project Adoption
## Sustainability Survey
## TechDocs Open Office Hours
## Google Summer Of Code 
## Upcoming CFP Deadlines


#### 

## 📝Certification Expiration Changes
The Linux Foundation has announced a certification policy change effective 2024. This update includes revisions to exam eligibility requirements and a new retake policy, providing candidates with greater flexibility and support. These changes are part of the Linux Foundation's commitment to maintaining the integrity and relevance of its certification programs within the evolving landscape of technology.

[Learn More](https://training.linuxfoundation.org/certification-policy-change-2024/?utm_source=hs_email&utm_medium=email&_hsenc=p2ANqtz-8arVGmTX_JL4lNqa4ikKnLbt8ak4yM9rLY35uelNYkYzJZTgWcBQdcGJxykqUngkHbVN2u)

## 🗃️ Resource Provider Mega Thread
There’s a lot of news this month around resources provided to projects! Please read as your project may be impacted or could benefit from this news:

### OCI Credits Now Available for Projects
Oracle has kindly donated $3 million in OCI credits for CNCF projects. These credits are now available for all CNCF projects, and we encourage you to investigate adding OCI to your CI/CD pipelines. Check out this [blog post](https://www.cncf.io/blog/2024/02/02/oracle-oci-credits-are-now-available-to-cncf-projects-here-is-what-you-need-to-know/?utm_source=hs_email&utm_medium=email&_hsenc=p2ANqtz-8arVGmTX_JL4lNqa4ikKnLbt8ak4yM9rLY35uelNYkYzJZTgWcBQdcGJxykqUngkHbVN2u) for more information!

### Equinix Updates
The folks at Equinix have asked us to remind projects using their resources that they are bare metal! That means that any machines you have that sit idle, or even off, are still taking up resources and burning carbon for no reason. Equinix and CNCF Staff are double-checking that all the usage is valid and that resources are not stale/orphaned.

If you have an Equinix footprint, please take a few minutes and ensure the machines your project is using are what is needed. Doing so will also get you ahead of the game on the policy changes mentioned above. If you have any Equinix-specific questions or want help right-sizing machines, don’t hesitate to reach out to (equinix@cncf.io).

### New Policy on Resource Usage
To be good stewards of the resources donated to us by various providers, we CNCF folks need to change how we’re handing out and monitoring project usage of cloud/provider resources. To that end, we’ve written a policy around projects requesting and using compute resources. 

#### TL;DR: 

CNCF will have hosted GHA Runners for you to use across all our major providers. If a provider/architecture/shape doesn’t exist, please contact CNCF staff, and we will add it.
Unless there are extenuating circumstances, you should shape your CI to work within GitHub Actions. Resources just for CI/CD must be re-requested and approved by CNCF Staff.
Non-ephemeral resources need to be re-requested every six months. At seven months, those resources are subject to deletion. 
This will go into effect in September 2024, with staff reaching out to projects over the coming months to discuss their usage and identify a path forward

Note from Jeefy: These changes are definitely a departure from how things have normally been handled, and it will also be a big lift from some projects. But we’ve also grown past what we can manage “the old way.” This gives us a much more sustainable model across the board. Thanks for helping us and your fellow projects out.

### GitHub Action Runners
The CNCF team has been working on supplementing the provided GitHub runners with hosted runners within our various providers. If your project is part of the CNCF’s GitHub Enterprise account, you should already have access to some. Example below:

To use these runners, see the [syntax provided by GitHub](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idruns-on) and use the name of the runner provided (ex. equinix-4cpu-16gb). We will be adding different types of runners over the next few months. If you would like any specific shape, size, or vendor platform, please reach out to us in [ServiceDesk](https://cncfservicedesk.atlassian.net/servicedesk/customer/portal/1?_hsenc=p2ANqtz-8arVGmTX_JL4lNqa4ikKnLbt8ak4yM9rLY35uelNYkYzJZTgWcBQdcGJxykqUngkHbVN2u&utm_medium=email&utm_source=hs_email) and we’ll get it running ASAP!

### Join the LFX Insights v3 Beta Pilot Program
LFX is piloting a new tool for maintainers to learn about community growth trends and project velocity trends. Many early adopters have already boarded Insights, and we invite you to join them. Getting added to Insights is similar to configuring the DCO bot on your GitHub organization and activating it for one or more repos. [Learn more about Insights v3 here](https://docs.linuxfoundation.org/lfx/insights/v3-beta-version-current?utm_source=hs_email&utm_medium=email&_hsenc=p2ANqtz-8arVGmTX_JL4lNqa4ikKnLbt8ak4yM9rLY35uelNYkYzJZTgWcBQdcGJxykqUngkHbVN2u) and contact Daniel Krook on Slack to start onboarding now.


### Use Scarf to Measure Project Adoption
Scarf is now available to CNCF projects to learn about the adoption patterns of their projects through anonymized usage metrics. The Linux Foundation has partnered with Scarf to provide projects with licenses for their entire team, as well as hands-on support from Scarf. [Learn more about using Scarf here](https://about.scarf.sh/post/the-linux-foundation-is-partnering-with-scarf-for-oss-usage-analytics?utm_source=hs_email&utm_medium=email&_hsenc=p2ANqtz-8arVGmTX_JL4lNqa4ikKnLbt8ak4yM9rLY35uelNYkYzJZTgWcBQdcGJxykqUngkHbVN2u).

## 🔋Sustainability Survey
Participate in the [CNCF Sustainability Survey](https://www.surveymonkey.com/r/YW5QK6D?utm_source=hs_email&utm_medium=email&_hsenc=p2ANqtz-8arVGmTX_JL4lNqa4ikKnLbt8ak4yM9rLY35uelNYkYzJZTgWcBQdcGJxykqUngkHbVN2u) to help shape the future of sustainability practices within cloud-native computing. Your input will contribute to developing environmentally conscious solutions in the CNCF ecosystem.

## 📋TechDocs: TechDocsCon CFP
On the last Wednesday of each month, the TechDocs team hosts Open Office Hours for anyone to drop in with questions about technical documentation. Our next session will be on Feb 28, 2024, at 8:00 AM PST. You can find details on how to join us on the [public calendar](https://tockify.com/cncf.public.events/detail/701/1709136000000?startms=1709078400000&utm_source=hs_email&utm_medium=email&_hsenc=p2ANqtz-8arVGmTX_JL4lNqa4ikKnLbt8ak4yM9rLY35uelNYkYzJZTgWcBQdcGJxykqUngkHbVN2u). Hope to see you there!

## ☀️Google Summer of Code 2024
CNCF has been accepted as a mentoring organization for 2024 🎉 Thanks everyone for all your support and proposals! See the whole list of accepted mentoring organizations at (https://g.co/gsoc).

Now we’ve been accepted as an org, feel free to [update or add any project proposals](https://github.com/cncf/mentoring/blob/main/programs/summerofcode/2024.md?utm_source=hs_email&utm_medium=email&_hsenc=p2ANqtz-8arVGmTX_JL4lNqa4ikKnLbt8ak4yM9rLY35uelNYkYzJZTgWcBQdcGJxykqUngkHbVN2u) up until March 11 when we make our request for project slots.

[Check Out the Timeline](https://developers.google.com/open-source/gsoc/timeline?utm_source=hs_email&utm_medium=email&_hsenc=p2ANqtz-8arVGmTX_JL4lNqa4ikKnLbt8ak4yM9rLY35uelNYkYzJZTgWcBQdcGJxykqUngkHbVN2u)

## ✍️Upcoming CFP Deadlines:
Here are the upcoming deadlines for CFPs:
- [CloudNativeHacks](https://events.linuxfoundation.org/kubecon-cloudnativecon-europe/program/cloudnativehacks/?utm_source=hs_email&utm_medium=email&_hsenc=p2ANqtz-8arVGmTX_JL4lNqa4ikKnLbt8ak4yM9rLY35uelNYkYzJZTgWcBQdcGJxykqUngkHbVN2u) - February 24
- [KCD Pune](https://sessionize.com/kcd-pune-2024?utm_source=hs_email&utm_medium=email&_hsenc=p2ANqtz-8arVGmTX_JL4lNqa4ikKnLbt8ak4yM9rLY35uelNYkYzJZTgWcBQdcGJxykqUngkHbVN2u) - March 4
- [AI_Dev](https://events.linuxfoundation.org/ai-dev-europe/program/cfp/?utm_source=hs_email&utm_medium=email&_hsenc=p2ANqtz-8arVGmTX_JL4lNqa4ikKnLbt8ak4yM9rLY35uelNYkYzJZTgWcBQdcGJxykqUngkHbVN2u) - March 5
- [KCD Islamabad](https://sessionize.com/kubernetes-community-day-islamabad?utm_source=hs_email&utm_medium=email&_hsenc=p2ANqtz-8arVGmTX_JL4lNqa4ikKnLbt8ak4yM9rLY35uelNYkYzJZTgWcBQdcGJxykqUngkHbVN2u) - March 9
- [StrimziCon](https://sessionize.com/strimzicon-2024/?utm_source=hs_email&utm_medium=email&_hsenc=p2ANqtz-8arVGmTX_JL4lNqa4ikKnLbt8ak4yM9rLY35uelNYkYzJZTgWcBQdcGJxykqUngkHbVN2u) - March 10
- [KCD Shanghai](https://sessionize.com/kubernetes-community-day-islamabad?utm_source=hs_email&utm_medium=email&_hsenc=p2ANqtz-8arVGmTX_JL4lNqa4ikKnLbt8ak4yM9rLY35uelNYkYzJZTgWcBQdcGJxykqUngkHbVN2u) - March 17
- [KCD Munich](https://sessionize.com/kcd-munich-2024-cfp?utm_source=hs_email&utm_medium=email&_hsenc=p2ANqtz-8arVGmTX_JL4lNqa4ikKnLbt8ak4yM9rLY35uelNYkYzJZTgWcBQdcGJxykqUngkHbVN2u) - March 31
- [CloudNativeSecurityCon](https://events.linuxfoundation.org/cloudnativesecuritycon-north-america/program/cfp/?utm_source=hs_email&utm_medium=email&_hsenc=p2ANqtz-8arVGmTX_JL4lNqa4ikKnLbt8ak4yM9rLY35uelNYkYzJZTgWcBQdcGJxykqUngkHbVN2u) - March 31
- [KCD Zurich](https://sessionize.com/kcd-zurich-2024?utm_source=hs_email&utm_medium=email&_hsenc=p2ANqtz-8arVGmTX_JL4lNqa4ikKnLbt8ak4yM9rLY35uelNYkYzJZTgWcBQdcGJxykqUngkHbVN2u) - March 31
- [KCD Czech + Slovak](https://sessionize.com/kcd-czech-slovak-2024?utm_source=hs_email&utm_medium=email&_hsenc=p2ANqtz-8arVGmTX_JL4lNqa4ikKnLbt8ak4yM9rLY35uelNYkYzJZTgWcBQdcGJxykqUngkHbVN2u) - March 31
- [WasmCon](https://events.linuxfoundation.org/wasmcon/program/cfp/?utm_source=hs_email&utm_medium=email&_hsenc=p2ANqtz-8arVGmTX_JL4lNqa4ikKnLbt8ak4yM9rLY35uelNYkYzJZTgWcBQdcGJxykqUngkHbVN2u) - March 31
- [KCD Italy](https://sessionize.com/kcd-italy-2024?utm_source=hs_email&utm_medium=email&_hsenc=p2ANqtz-8arVGmTX_JL4lNqa4ikKnLbt8ak4yM9rLY35uelNYkYzJZTgWcBQdcGJxykqUngkHbVN2u) - April 4


Want to contribute to March's newsletter? 
[Contribute Today!](projects@cncf.io)



