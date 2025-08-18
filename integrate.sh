#!/bin/bash

# --- Configuration ---
SOURCE_FILE="generated.tsx"
COMPONENTS_DIR="src/app/components"
DEFAULT_PAGE_FILE="src/app/page.tsx"

# --- Colors for output ---
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# --- Main Script ---

echo -e "${BLUE}Starting component integration script...${NC}"

# 1. Check if the source file exists
if [ ! -f "$SOURCE_FILE" ]; then
    echo -e "${YELLOW}Error: Source file '$SOURCE_FILE' not found. Please make sure it's in the project root.${NC}"
    exit 1
fi

# 2. Create the components directory if it doesn't exist
echo "Ensuring component directory exists at '$COMPONENTS_DIR'..."
mkdir -p "$COMPONENTS_DIR"
echo -e "${GREEN}Directory is ready.${NC}"
echo ""

# 3. Extract component names
echo "Extracting component names..."
COMPONENT_NAMES=$(grep -o 'NAME="[^"]*"' "$SOURCE_FILE" | sed 's/NAME="//g' | sed 's/"//g')

# 4. Process each component
for component_name in $COMPONENT_NAMES; do
    echo "Processing component: $component_name"
    
    # Determine target file
    if [ "$component_name" = "HomePage" ]; then
        target_file="$DEFAULT_PAGE_FILE"
    else
        target_file="$COMPONENTS_DIR/$component_name.tsx"
    fi
    
    echo "Creating file: $target_file"
    
    # Extract component content using sed
    # Start from the component opening tag and end at the closing tag
    sed -n "/\/\/<COMPONENT NAME=\"$component_name\"/,/\/\/<\/COMPONENT>/p" "$SOURCE_FILE" | \
    sed '1d' | sed '$d' > "$target_file"
    
    # Add React import if it's not the HomePage
    if [ "$component_name" != "HomePage" ]; then
        # Check if React import already exists
        if ! grep -q "import React" "$target_file"; then
            echo "import React from 'react';" > temp_file
            cat "$target_file" >> temp_file
            mv temp_file "$target_file"
        fi
    fi
    
    echo -e "${GREEN}✓ Created $target_file${NC}"
done

echo ""
echo -e "${GREEN}Script finished successfully!${NC}"
echo -e "${YELLOW}Summary:${NC}"
echo "- Components have been created in the '$COMPONENTS_DIR' directory."
echo "- The main page has been updated at '$DEFAULT_PAGE_FILE'."
echo ""
echo -e "${BLUE}Next Steps:${NC}"
echo "1. Review the generated files in your editor."
echo "2. Run npm install if any new dependencies were added."
echo "3. Start your development server with npm run dev to see the result."

exit 0
