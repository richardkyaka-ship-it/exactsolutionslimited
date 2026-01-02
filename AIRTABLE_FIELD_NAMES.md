# Airtable Field Names Configuration

## ⚠️ IMPORTANT: Field Name Mismatch

The error shows that Airtable doesn't recognize the field name "KEY SPECS". 

**Airtable field names are CASE-SENSITIVE and must match EXACTLY.**

## Current Field Names in Code

The code uses these field names:
- `Name`
- `Product Code`
- `Category`
- `Short Description`
- `Key Specs` ⚠️ **This is causing the error**
- `Full Specs`
- `Applications`
- `Installation Requirements`
- `WhatsApp Message`
- `Status`
- `Featured`
- `Images`
- `Created At`
- `Updated At`

## How to Fix

### Option 1: Check Your Airtable Table Field Names

1. Go to your Airtable base
2. Open the "Products" table
3. Check the **exact** field names (case-sensitive!)
4. Update the field names in `lib/airtable.ts` to match exactly

### Option 2: Common Field Name Variations

The field might be named:
- `Key Specs` (what we're using)
- `key specs` (all lowercase)
- `KeySpecs` (no space)
- `Key specs` (mixed case)
- `KEY SPECS` (all uppercase)

### Option 3: Update Field Names in Code

Edit `lib/airtable.ts` and change the field names to match your Airtable table:

```typescript
// In productToAirtable function, change:
fields['Key Specs'] = ...  // Change this
// To match your actual Airtable field name, e.g.:
fields['key specs'] = ...  // or whatever it's called
```

## Quick Fix

If you want to quickly test, you can:

1. **Check your Airtable table** - Look at the actual field names
2. **Update the code** - Change field names in `lib/airtable.ts` to match exactly
3. **Or rename fields in Airtable** - Make them match the code

## Field Name Mapping

You can also create a field name mapping if your Airtable uses different names:

```typescript
// Add this at the top of lib/airtable.ts
const FIELD_NAMES = {
  NAME: 'Name',
  PRODUCT_CODE: 'Product Code',
  CATEGORY: 'Category',
  SHORT_DESCRIPTION: 'Short Description',
  KEY_SPECS: 'Key Specs', // Change this to match Airtable
  FULL_SPECS: 'Full Specs',
  APPLICATIONS: 'Applications',
  // ... etc
}
```

Then use `FIELD_NAMES.KEY_SPECS` instead of hardcoded strings.

---

**Action Required**: Check your Airtable table field names and update the code to match exactly!

