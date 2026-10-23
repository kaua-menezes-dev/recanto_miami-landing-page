# WhatsApp-First Lead Conversion

**Status:** Keep the current personalized WhatsApp quote-request model; exact existing form behavior must be audited before final design.

## Goal
Move from inspiration to a productive commercial conversation with minimal friction. The site should collect the same useful information as the existing Recanto Miami inquiry experience and open a business WhatsApp conversation with a **pre-filled, editable message**.

**Important:** Opening WhatsApp is not sending the message. The visitor must intentionally send it inside WhatsApp. Do not claim lead delivery or confirmed booking until the visitor actually sends and the business receives it.

## Two primary section entry points, one shared flow

### Section 04 — Experiences & Services
Visitor explores what the venue offers, then selects a contextual CTA such as **"Solicitar orçamento"**.

### Section 07 — Plan Your Event
Visitor is ready to plan, then selects a contextual CTA such as **"Começar meu planejamento"**.

Both entry points should open the **same inquiry UI and message builder**, with subtle source context if useful, rather than maintaining two independent forms. Additional hero / footer CTAs may route into that same flow.

## Form design — preserve the existing business process
- Audit the current website first: identify the existing input fields, which are required, validation, consent notice, order and message template.
- Previously discussed core details: visitor's name, event type, preferred date, guest count; existing form may additionally use email/WhatsApp. **Do not finalize these fields without the audit.**
- Keep the form short, with contextual labels and accessible errors.
- Retain draft values when closing/reopening the form within the same visit where feasible, without inventing a server-side lead database.
- Allow a visitor without a definite date or count to contact sales if the existing process supports it.
- Avoid requesting irrelevant sensitive details.

## Message construction — illustrative, not the approved template
> Olá! Meu nome é Mariana. Conheci o Recanto Miami pelo site e gostaria de solicitar um orçamento para um casamento em 15/08/2027, com aproximadamente 150 convidados. Poderiam me passar mais informações?

Use safe encoding when composing a WhatsApp URL, insert only explicitly provided fields and avoid exposing user input in tracking/analytics URLs beyond what is required for the WhatsApp handoff. The **actual business phone number** must come from confirmed owner-provided contact information.

## Conversion principles
1. Clearly label what happens when the CTA is activated: it opens WhatsApp with a ready-to-send message.
2. Do not make the user repeatedly type the same information when moving between sections.
3. A visitor who only wants basic information should not be blocked by an extensive questionnaire.
4. Keep CTAs discoverable but understated; no intrusive repetitive popups.
5. Consider tracking meaningful funnel steps only with appropriate consent and privacy treatment; distinguish CTA clicks from completed inbound messages.
6. Ensure mobile flow works with WhatsApp app/browser and desktop flow works with WhatsApp Web.
7. Present privacy information and data handling for form inputs in compliance with applicable requirements; do not imply server storage exists if it does not.

## Design deliverables
- Desktop/mobile entry state from section 04.
- Desktop/mobile entry state from section 07.
- Shared form design, field validation and prefilled-message preview state.
- Confirmation that the visitor can inspect/edit/send the message in WhatsApp.
- Pending data and decisions identified before implementation.
